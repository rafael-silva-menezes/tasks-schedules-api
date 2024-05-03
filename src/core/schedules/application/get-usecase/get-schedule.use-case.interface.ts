import { IUseCase } from '@core/shared/application/use-case.interfce';
import { ScheduleOutput } from '../common/schedule.use-case.mapper.types';

export type GetScheduleInput = {
  id: string;
};
export type GetScheduleOutput = ScheduleOutput;

export interface IGetScheduleUseCase
  extends IUseCase<GetScheduleInput, GetScheduleOutput> {}
