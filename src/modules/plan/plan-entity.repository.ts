import {Injectable} from "@nestjs/common";
import {PlanRepository} from "../../infrastructure/plan.repository";
import {Plan} from "../../domain/model/plan.entity";
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class PlanEntityRepository extends Repository<Plan> implements PlanRepository {
    constructor(@InjectRepository(Plan)
                private planRepository: Repository<Plan>) {
        super(planRepository.target,
            planRepository.manager,
            planRepository.queryRunner);
    }

    async findAll(): Promise<Plan[]> {
        return await this.find();
    }

    findById(id: string): Promise<Plan> {
        return this.findOneBy({id: id});
    }

    findByName(name: string): Promise<Plan> {
        return this.manager
            .createQueryBuilder(Plan, 'plan')
            .where(
                'UPPER(plan.name) LIKE UPPER(:name)',
                {
                    name: `%${name}%`,
                },
            )
            .getOne();
    }

    findByReduction(reduction: number): Promise<Plan> {
        return this.findOneBy({reduction: reduction});
    }

    findByNbWeeks(nbWeeks: number): Promise<Plan> {
        return this.manager
            .createQueryBuilder(Plan, 'plan')
            .where(
                'plan.nb_weeks <= :nbWeeks',
                {
                    nbWeeks: nbWeeks,
                }
            )
            .orderBy('plan.nb_weeks', 'DESC')
            .limit(1)
            .getOne();
    }

    findByDuration(start: Date, end: Date): Promise<Plan> {
        return this.manager
          .createQueryBuilder(Plan, 'plan')
          .where(
            'plan.nb_weeks <= FLOOR((EXTRACT(days FROM (:endDate::timestamp - :startDate::timestamp)) / 7))',
            {
                startDate: start,
                endDate: end,
            }
          )
          .orderBy('plan.nb_weeks', 'DESC')
          .limit(1)
          .getOne();
    }

    async deletePlan(plan: Plan): Promise<void> {
        await this.remove(plan);
    }

    async saveOrUpdate(plan: Plan): Promise<void> {
        await this.save(plan);
    }


}
