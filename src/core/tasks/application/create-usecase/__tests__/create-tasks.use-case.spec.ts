import { TasksType } from '@core/tasks/domain/interfaces/tasks.types';
import { CreateTasksUseCase } from '../create-tasks.use-case';
import { TasksInMemoryRepository } from '@core/tasks/infra/db/in-memory/tasks-in-memory.repository';
import { v4 as uuidv4 } from 'uuid';

describe('CreateTasksUseCase Unit Tests', () => {
  let useCase: CreateTasksUseCase;
  let repository: TasksInMemoryRepository;

  beforeEach(() => {
    repository = new TasksInMemoryRepository();
    useCase = new CreateTasksUseCase(repository);
  });

  it('should throw an error when aggregate is not valid', async () => {
    const input = {
      accountId: uuidv4(),
      scheduleId: uuidv4(),
      type: 'any type' as TasksType,
    };
    await expect(() => useCase.execute(input)).rejects.toThrow(
      'Entity Validation Error',
    );
  });

  it('should create a tasks', async () => {
    const spyInsert = jest.spyOn(repository, 'insert');
    const accountId = uuidv4();
    const scheduleId = uuidv4();

    const input1 = {
      accountId,
      scheduleId,
      type: TasksType.BREAK,
      startTime: new Date(),
      duration: 100,
    };
    const output1 = await useCase.execute(input1);
    expect(spyInsert).toHaveBeenCalledTimes(1);
    expect(output1).toMatchObject({
      accountId: input1.accountId,
      scheduleId: input1.scheduleId,
    });

    const input2 = {
      accountId,
      scheduleId,
      type: TasksType.WORK,
    };
    const output2 = await useCase.execute(input2);
    expect(spyInsert).toHaveBeenCalledTimes(2);
    expect(output2).toMatchObject({
      accountId: input2.accountId,
      scheduleId: input2.scheduleId,
    });
  });
});
