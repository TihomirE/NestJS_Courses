import { Controller, Get } from "@nestjs/common";
import { findAllCourses } from "../../../db-data";
import { Course } from "../../../../shared/course";

@Controller()
export class CoursesController {

    @Get('/api/courses')
    async allCourses(): Promise<Course[]> {
        return findAllCourses() as Course[];
    }

}
