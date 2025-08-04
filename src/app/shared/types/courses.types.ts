export interface Author {
  id: string;
  name: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  creationDate: string; // MM/dd/yyyy
  duration: number;
  authors: string[];
}

export interface ApiResponse<T> {
  successful: boolean;
  result: T;
  error?: string;
}

export interface CourseWithAuthors extends Omit<Course, 'authors'> {
  authors: Author[];
}

export interface CreateCourseRequest extends Omit<Course, 'id' | 'authors'> {
  authors: string[]; // author IDs
}
