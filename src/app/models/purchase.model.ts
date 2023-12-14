export class Purchase {
  id: number | undefined;
  userId: string | undefined;
  courseId: number | undefined;
  total: number | undefined;
  purchaseTime: Date = new Date();

  constructor(userId?: string, courseId?: number, total?: number) {
    this.userId = userId;
    this.courseId = courseId;
    this.total = total;
  }
}
