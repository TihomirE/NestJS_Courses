import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { CoursesController } from "./controllers/courses.controller";
import { LessonsController } from "./controllers/lessons.controller";
import { CoursesRepository } from "./repositories/courses.repository";
import { LessonsRepository } from "./repositories/lessons.repository";
import { CoursesSchema } from "./schemas/courses.schema";
import { LessonsSchema } from "./schemas/lessons.schema";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: "Course", schema: CoursesSchema },
            { name: "Lesson", schema: LessonsSchema }
        ]),
        
    ],
    controllers: [
        CoursesController,
        LessonsController
    ],
    providers: [
        CoursesRepository,
        LessonsRepository
    ]
})
export class CoursesModule { };
