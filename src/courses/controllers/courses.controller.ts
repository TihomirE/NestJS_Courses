import { BadRequestException, Body, Controller, Delete, Get, HttpException, NotFoundException, Param, Post, Put, UseFilters, UseGuards } from "@nestjs/common";
import { AdminGuard } from "src/guards/admin.guard";
import { AuthenticationGuard } from "src/guards/authentication.guard";
import { ToIntegerPipe } from "src/pipes/to-integer.pipe";
// TODO issue with this import >> cannot find module!
// import { HttpExceptionFilter } from "src/filters/http.filter";
import { Course } from "../../../../shared/course";
import { CoursesRepository } from "../repositories/courses.repository";

@Controller('courses')
@UseGuards(AuthenticationGuard) // same as below, can be used for a specific method
    // using our custom created filter for whole controller, but it can be used just for the method as well
    // TODO find the solution for the error cannot find module
    // @UseFilters(new HttpExceptionFilter())
export class CoursesController {

    constructor(
        private coursesRepository: CoursesRepository
    ) { }

    @Post()
    @UseGuards(AdminGuard)
    async createCourse(@Body() course: Course): Promise<Course> {

        console.log("creating new course");

        return this.coursesRepository.addCourse(course);
    }

    @Get()
    // @UseGuards(AuthenticationGuard) >> it can be applied just to a specific method/call 
    async allCourses(): Promise<Course[]> {
        return this.coursesRepository.findAll();
    }

    @Get(':courseUrl')
    async findCourseByUrl(@Param('courseUrl') courseUrl: string) {
        console.log('Finding by courseUrl ', courseUrl);

        const course = await this.coursesRepository.findCourseByUrl(courseUrl);

        if (!course) {
            throw new NotFoundException('Could not find course for url ' + courseUrl);
        }

        return course;
    }

    @Put(':courseId')
    @UseGuards(AdminGuard)
    async updateCourse(
        @Param("courseId") courseId: string,
        // using our custom pipe to convert string to number (or to make sure that number is always sent to db)
        // @Body("seqId", ToIntegerPipe) seqId: number,
        // @Body("seqId", ParseIntPipe) seqId: number, >> same thing just this one is built in NestJS pipe
        @Body() changes: Course
    ): Promise<Course> {

        console.log("updating course" + courseId);

        // making sure that changes object doesn't contian course _id (if it does we can corupt data in DB like creating a new course etc)
        if (changes._id) {
            throw new BadRequestException("Can't update course id");
        }

        return this.coursesRepository.updateCourse(courseId, changes);
    }

    @Delete(':courseId')
    @UseGuards(AdminGuard)
    async deleteCourse(@Param("courseId") courseId: string) {

        console.log("deleting course" + courseId);

        return this.coursesRepository.deleteCourse(courseId);
    }

}
