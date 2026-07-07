export interface Coach {
  id: number
  userId: number
  name: string
  avatar: string
  title: string
  bio: string
  specialty: string
  certifications: string
  experienceYears: number
  education: string
  hourlyRate: number
  maxStudents: number
  rating: number
  reviewCount: number
  studentCount: number
  verified: boolean
  status: string
  createdAt: string
}

export interface CoachReview {
  id: number
  coachId: number
  userId: number
  username: string
  avatar: string
  rating: number
  comment: string
  createdAt: string
}

export interface CoachDashboard extends Coach {
  planCount: number
  articleCount: number
}
