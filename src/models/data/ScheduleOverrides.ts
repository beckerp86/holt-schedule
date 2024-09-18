import { IScheduleOverride } from '../../sevices/schedule.service';
import { ScheduleTypeEnum } from '../ScheduleTypeEnum';

const noSchoolOverrides: IScheduleOverride[] = [
  {
    date: new Date(2024, 9, 14),
    scheduleType: ScheduleTypeEnum.NoSchool,
    reason: 'Fall Break',
  },
  {
    date: new Date(2024, 9, 15),
    scheduleType: ScheduleTypeEnum.NoSchool,
    reason: 'Fall Break',
  },
  {
    date: new Date(2024, 9, 16),
    scheduleType: ScheduleTypeEnum.NoSchool,
    reason: 'Fall Break',
  },
  {
    date: new Date(2024, 9, 17),
    scheduleType: ScheduleTypeEnum.NoSchool,
    reason: 'Fall Break',
  },
  {
    date: new Date(2024, 9, 18),
    scheduleType: ScheduleTypeEnum.NoSchool,
    reason: 'Fall Break',
  },
  {
    date: new Date(2024, 10, 5),
    scheduleType: ScheduleTypeEnum.NoSchool,
    reason: 'Election Day',
  },
  {
    date: new Date(2024, 10, 27),
    scheduleType: ScheduleTypeEnum.NoSchool,
    reason: 'Thanksgiving Break',
  },
  {
    date: new Date(2024, 10, 28),
    scheduleType: ScheduleTypeEnum.NoSchool,
    reason: 'Thanksgiving Break',
  },
  {
    date: new Date(2024, 10, 29),
    scheduleType: ScheduleTypeEnum.NoSchool,
    reason: 'Thanksgiving Break',
  },
  {
    date: new Date(2024, 11, 23),
    scheduleType: ScheduleTypeEnum.NoSchool,
    reason: 'Winter Break',
  },
  {
    date: new Date(2024, 11, 24),
    scheduleType: ScheduleTypeEnum.NoSchool,
    reason: 'Winter Break',
  },
  {
    date: new Date(2024, 11, 25),
    scheduleType: ScheduleTypeEnum.NoSchool,
    reason: 'Winter Break',
  },
  {
    date: new Date(2024, 11, 26),
    scheduleType: ScheduleTypeEnum.NoSchool,
    reason: 'Winter Break',
  },
  {
    date: new Date(2024, 11, 27),
    scheduleType: ScheduleTypeEnum.NoSchool,
    reason: 'Winter Break',
  },
  {
    date: new Date(2024, 11, 30),
    scheduleType: ScheduleTypeEnum.NoSchool,
    reason: 'Winter Break',
  },
  {
    date: new Date(2024, 11, 31),
    scheduleType: ScheduleTypeEnum.NoSchool,
    reason: 'Winter Break',
  },
  {
    date: new Date(2025, 0, 1),
    scheduleType: ScheduleTypeEnum.NoSchool,
    reason: 'Winter Break',
  },
  {
    date: new Date(2025, 0, 2),
    scheduleType: ScheduleTypeEnum.NoSchool,
    reason: 'Winter Break',
  },
  {
    date: new Date(2025, 0, 3),
    scheduleType: ScheduleTypeEnum.NoSchool,
    reason: 'Winter Break',
  },
  {
    date: new Date(2025, 0, 20),
    scheduleType: ScheduleTypeEnum.NoSchool,
    reason: 'MLK Jr. Day',
  },
  {
    date: new Date(2025, 1, 14),
    scheduleType: ScheduleTypeEnum.NoSchool,
    reason: 'Mid-Winter Break',
  },
  {
    date: new Date(2025, 1, 17),
    scheduleType: ScheduleTypeEnum.NoSchool,
    reason: 'Mid-Winter Break',
  },
  {
    date: new Date(2025, 2, 21),
    scheduleType: ScheduleTypeEnum.NoSchool,
    reason: 'Spring Break',
  },
  {
    date: new Date(2025, 2, 24),
    scheduleType: ScheduleTypeEnum.NoSchool,
    reason: 'Spring Break',
  },
  {
    date: new Date(2025, 2, 25),
    scheduleType: ScheduleTypeEnum.NoSchool,
    reason: 'Spring Break',
  },
  {
    date: new Date(2025, 2, 26),
    scheduleType: ScheduleTypeEnum.NoSchool,
    reason: 'Spring Break',
  },
  {
    date: new Date(2025, 2, 27),
    scheduleType: ScheduleTypeEnum.NoSchool,
    reason: 'Spring Break',
  },
  {
    date: new Date(2025, 2, 28),
    scheduleType: ScheduleTypeEnum.NoSchool,
    reason: 'Spring Break',
  },
  {
    date: new Date(2025, 4, 23),
    scheduleType: ScheduleTypeEnum.NoSchool,
    reason: 'Memorial Day Break',
  },
  {
    date: new Date(2025, 4, 26),
    scheduleType: ScheduleTypeEnum.NoSchool,
    reason: 'Memorial Day Break',
  },
];

const halfDayOverrides: IScheduleOverride[] = [
  {
    date: new Date(2024, 8, 26),
    scheduleType: ScheduleTypeEnum.HalfDay1Through3,
    reason: 'Parent/Teacher Conferences',
  },
  {
    date: new Date(2024, 8, 27),
    scheduleType: ScheduleTypeEnum.HalfDay4Through6,
    reason: 'Parent/Teacher Conferences',
  },
  {
    date: new Date(2025, 0, 15),
    scheduleType: ScheduleTypeEnum.HalfDay1And2,
    reason: 'Exams',
  },
  {
    date: new Date(2025, 0, 16),
    scheduleType: ScheduleTypeEnum.HalfDay3And4,
    reason: 'Exams',
  },
  {
    date: new Date(2025, 0, 17),
    scheduleType: ScheduleTypeEnum.HalfDay5And6,
    reason: 'Exams',
  },
  {
    date: new Date(2025, 2, 6),
    scheduleType: ScheduleTypeEnum.HalfDay1Through3,
    reason: 'Parent/Teacher Conferences',
  },
  {
    date: new Date(2025, 2, 7),
    scheduleType: ScheduleTypeEnum.HalfDay4Through6,
    reason: 'Parent/Teacher Conferences',
  },
  {
    date: new Date(2025, 5, 10),
    scheduleType: ScheduleTypeEnum.HalfDay1And2,
    reason: 'Exams',
  },
  {
    date: new Date(2025, 5, 11),
    scheduleType: ScheduleTypeEnum.HalfDay3And4,
    reason: 'Exams',
  },
  {
    date: new Date(2025, 5, 12),
    scheduleType: ScheduleTypeEnum.HalfDay5And6,
    reason: 'Exams',
  },
];

const pepRallyOverrides: IScheduleOverride[] = [
  {
    date: new Date(2024, 8, 23),
    scheduleType: ScheduleTypeEnum.PepRally,
  },
];

const earlyReleaseWednesdayOverrides: IScheduleOverride[] = [
  {
    date: new Date(2024, 8, 11),
    scheduleType: ScheduleTypeEnum.EarlyRelease,
  },
  {
    date: new Date(2024, 9, 9),
    scheduleType: ScheduleTypeEnum.EarlyRelease,
  },
  {
    date: new Date(2024, 9, 23),
    scheduleType: ScheduleTypeEnum.EarlyRelease,
  },
  {
    date: new Date(2024, 10, 6),
    scheduleType: ScheduleTypeEnum.EarlyRelease,
  },
  {
    date: new Date(2024, 10, 20),
    scheduleType: ScheduleTypeEnum.EarlyRelease,
  },
  {
    date: new Date(2024, 11, 4),
    scheduleType: ScheduleTypeEnum.EarlyRelease,
  },
  {
    date: new Date(2024, 11, 11),
    scheduleType: ScheduleTypeEnum.EarlyRelease,
  },
  {
    date: new Date(2025, 0, 8),
    scheduleType: ScheduleTypeEnum.EarlyRelease,
  },
  {
    date: new Date(2025, 0, 22),
    scheduleType: ScheduleTypeEnum.EarlyRelease,
  },
  {
    date: new Date(2025, 1, 5),
    scheduleType: ScheduleTypeEnum.EarlyRelease,
  },
  {
    date: new Date(2025, 1, 19),
    scheduleType: ScheduleTypeEnum.EarlyRelease,
  },
  {
    date: new Date(2025, 2, 12),
    scheduleType: ScheduleTypeEnum.EarlyRelease,
  },
  {
    date: new Date(2025, 2, 19),
    scheduleType: ScheduleTypeEnum.EarlyRelease,
  },
  {
    date: new Date(2025, 3, 2),
    scheduleType: ScheduleTypeEnum.EarlyRelease,
  },
  {
    date: new Date(2025, 3, 23),
    scheduleType: ScheduleTypeEnum.EarlyRelease,
  },
  {
    date: new Date(2025, 4, 7),
    scheduleType: ScheduleTypeEnum.EarlyRelease,
  },
  {
    date: new Date(2025, 4, 21),
    scheduleType: ScheduleTypeEnum.EarlyRelease,
  },
  {
    date: new Date(2025, 4, 28),
    scheduleType: ScheduleTypeEnum.EarlyRelease,
  },
];

export const scheduleOverrides: IScheduleOverride[] = [
  ...noSchoolOverrides,
  ...halfDayOverrides,
  ...pepRallyOverrides,
  ...earlyReleaseWednesdayOverrides,
];
