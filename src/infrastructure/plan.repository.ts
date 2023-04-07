import {Plan} from "../domain/model/plan.entity";

export interface PlanRepository {
    findAll(): Promise<Plan[]>;

    findById(id: string): Promise<Plan>;

    saveOrUpdate(plan: Plan): Promise<Plan>;

    deletePlan(id: string): Promise<void>;
}
