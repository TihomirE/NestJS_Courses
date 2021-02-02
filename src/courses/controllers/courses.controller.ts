import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { Course } from "../../../../shared/course";
import { CoursesRepository } from "../repositories/courses.repository";

@Controller('courses')
export class CoursesController {

    constructor(
        private coursesRepository: CoursesRepository
    ) { }

    @Post()
    async createCourse(@Body() course: Partial<Course>): Promise<Course> {

        console.log("creating new course");

        return this.coursesRepository.addCourse(course);
    }

    @Get()
    async allCourses(): Promise<Course[]> {
        return this.coursesRepository.findAll();
    }

    @Put(':courseId')
    async updateCourse(
        @Param("courseId") courseId: string,
        @Body() changes: Partial<Course>
    ): Promise<Course> {

        console.log("updating course" + courseId);

        return this.coursesRepository.updateCourse(courseId, changes);
    }

    @Delete(':courseId')
    async deleteCourse(@Param("courseId") courseId: string) {

        console.log("deleting course" + courseId);

        return this.coursesRepository.deleteCourse(courseId);
    }

}
