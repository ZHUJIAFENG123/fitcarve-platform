const { pool } = require('../db');
const bcrypt = require('bcryptjs');

class User {
  static async findAll() {
    const [rows] = await pool.query('SELECT * FROM users ORDER BY created_at DESC');
    return rows;
  }

  static async findById(id) {
    const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
    return rows[0];
  }

  static async findByUsername(username) {
    const [rows] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
    return rows[0];
  }

  static async findByEmail(email) {
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
  }

  static async create(userData) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userData.password, salt);

    const [result] = await pool.query(
      `INSERT INTO users (username, email, password, role, avatar_url, bio, signature)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        userData.username,
        userData.email,
        hashedPassword,
        userData.role || 'user',
        userData.avatar || '',
        userData.bio || '',
        userData.signature || ''
      ]
    );
    return { id: result.insertId, ...userData };
  }

  static async update(id, userData) {
    const fields = [];
    const values = [];

    if (userData.username) {
      fields.push('username = ?');
      values.push(userData.username);
    }
    if (userData.email) {
      fields.push('email = ?');
      values.push(userData.email);
    }
    if (userData.password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(userData.password, salt);
      fields.push('password = ?');
      values.push(hashedPassword);
    }
    if (userData.role) {
      fields.push('role = ?');
      values.push(userData.role);
    }
    if (userData.avatar !== undefined) {
      fields.push('avatar_url = ?');
      values.push(userData.avatar);
    }
    if (userData.bio !== undefined) {
      fields.push('bio = ?');
      values.push(userData.bio);
    }
    if (userData.signature !== undefined) {
      fields.push('signature = ?');
      values.push(userData.signature);
    }

    fields.push('updated_at = NOW()');
    values.push(id);

    await pool.query(
      `UPDATE users SET ${fields.join(', ')} WHERE id = ?`,
      values
    );
    return this.findById(id);
  }

  static async delete(id) {
    await pool.query('DELETE FROM users WHERE id = ?', [id]);
    return true;
  }

  static async comparePassword(user, password) {
    return await bcrypt.compare(password, user.password);
  }

  static async updateLastLogin(id) {
    await pool.query('UPDATE users SET last_login = NOW() WHERE id = ?', [id]);
  }

  static async setVerificationToken(id, token) {
    await pool.query(
      'UPDATE users SET verification_token = ? WHERE id = ?',
      [token, id]
    );
  }

  static async verify(id) {
    await pool.query(
      'UPDATE users SET is_verified = 1, verification_token = NULL WHERE id = ?',
      [id]
    );
  }

  static async setResetPasswordToken(id, token, expires) {
    await pool.query(
      'UPDATE users SET reset_password_token = ?, reset_password_expires = ? WHERE id = ?',
      [token, expires, id]
    );
  }
}

module.exports = User;
