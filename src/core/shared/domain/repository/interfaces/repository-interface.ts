import { Entity } from "../../entities/entity";
import { ValueObject } from "../../entities/value-object";

export interface IRepository<E extends Entity, EntityId extends ValueObject> {
 insert(entity: E): Promise<void>;
 bulkInsert(entities: E[]): Promise<void>;
 update(entity: E): Promise<void>;
 delete(entityId: EntityId): Promise<void>;

 findById(entityId: EntityId): Promise<E | null>;
 findAll(): Promise<E[]>;

 getEntity(): new (...args: any[]) => E;
}