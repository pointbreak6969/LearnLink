export interface Resource {
  _id: string;
  id?: string;
  title?: string;
  text?: string;
  resource: string[];
  owner: string;
  classroom: string;
  views: number;
  name?: string; // Alternative name field that might be used
  createdAt: string;
  updatedAt: string;
  result?: {
    fullName: string;
    profileDetails: {
      profilePicture: {
        url: string;
      };
    };
  };
}

export interface CreateResourceData {
  title?: string;
  text?: string;
  files?: File[];
  classroomId: string;
}

// User types
export interface User {
  _id: string;
  username: string;
  email: string;
  fullName: string;
  isEmailVerified: boolean;
  avatar?: {
    url: string;
    publicId: string;
  };
  refreshToken?: string;
  emailVerificationToken?: string;
  emailVerificationExpiry?: Date;
  passwordResetToken?: string;
  passwordResetExpiry?: Date;
  loginType: "EMAIL_PASSWORD" | "GOOGLE" | "GITHUB";
  socialId?: string;
  role: "USER" | "ADMIN";
  createdAt: string;
  updatedAt: string;
}

// Profile types
export interface ProfilePicture {
  url: string;
  publicId: string;
}

export interface UserProfile {
  _id: string;
  owner: string;
  profilePicture: ProfilePicture;
  phone: string;
  location: string;
  university: string;
  college: string;
  createdAt: string;
  updatedAt: string;
}

// Classroom types
export interface Classroom {
  _id: string;
  id?: string;
  code: string;
  name: string;
  faculty: string;
  university: string;
  admin: User | string;
  users: User[] | string[];
  isVerified: boolean;
  classCode: string;
  price?: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateClassroomData {
  classroomName: string;
  universityName: string;
  facultyName: string;
}

export interface UpdateClassroomData {
  newClassroomName?: string;
  newFacultyName?: string;
  newUniversityName?: string;
}

// Form data types
export interface LoginFormData {
  email: string;
  password: string;
}

export interface SignupFormData {
  email: string;
  password: string;
  username: string;
  fullName: string;
}

export interface ProfileFormData {
  profilePicture?: FileList;
  phone: string;
  location: string;
  university: string;
  college: string;
}

// Component prop types
export interface MyCardProps {
  id: string;
  name: string;
  admin: User | string;
  faculty: string;
  university: string;
  isJoined: boolean;
}

export interface AvatarComponentProps {
  fullName: string;
  profilePicture?: string;
}

// Redux state types
export interface AuthState {
  status: boolean;
  userData: User | null;
}

export interface ProfileState {
  profileDetails: UserProfile | null;
  loading: boolean;
  error: string | null;
}

export interface RootState {
  auth: AuthState;
  profile: ProfileState;
}
