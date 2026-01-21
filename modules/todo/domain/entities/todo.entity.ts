export class TodoEntity {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly completed: boolean = false,
  ) {}
}