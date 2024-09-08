import { Activity } from "../ActivityModel";
import { ScheduleTypeEnum } from "../ScheduleTypeEnum";

export abstract class ScheduleModel {
    public abstract type: ScheduleTypeEnum;
    public abstract activities: Activity[];
}