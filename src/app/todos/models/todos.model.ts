export interface TodoDto {
  id?: number;
  content: string;
  isComplete: '0' | '1';
}

export type TodoActionsType = 'delete' | 'isComplete' | 'update';

export interface TodoActions {
  action: TodoActionsType;
  data: TodoDto;
}
