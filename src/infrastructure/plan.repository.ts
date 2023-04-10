import {Plan} from "../domain/model/plan.entity";

export interface PlanRepository {
    findAll(): Promise<Plan[]>;

    findById(id: string): Promise<Plan>;

    findByName(name: string): Promise<Plan>;

    findByReduction(reduction: number): Promise<Plan>;

    findByNbWeeks(nbWeeks: number): Promise<Plan>;

    findByDuration(start: Date, end: Date): Promise<Plan>;

    saveOrUpdate(plan: Plan): Promise<void>;

    deletePlan(plan: Plan): Promise<void>;
}
