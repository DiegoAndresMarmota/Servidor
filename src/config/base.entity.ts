import {
    CreateDateColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";

export abstract class BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @CreateDateColumn({
        name: "created_ad",
        type: "timestamp",
    })
    createAd!: Date;

    @UpdateDateColumn({
        name: "updated_ad",
        type: "timestamp",
    })
    updatedAt!: Date;
}