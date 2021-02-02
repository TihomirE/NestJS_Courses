import { Injectable } from "@nestjs/common";
import { Course } from "../../../../shared/course";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class CoursesRepository {

    constructor(
        // this is created in courses.module > MongooseModule.forFeature (or there it's all tied together)
        @InjectModel('Course') private courseModel: Model<Course>
    ) { }

    async findAll(): Promise<Course[]> {
        return this.courseModel.find();
    }

    async updateCourse(courseId: string, changes: Partial<Course>): Promise<Course> {
        return this.courseModel.findOneAndUpdate(
            { _id: courseId },
            changes,
            // configuration object to set to return the new updated object 
            { new: true });
    }

    async deleteCourse(courseId: string) {
        return this.courseModel.deleteOne({ _id: courseId });
    }

    async addCourse(course: Partial<Course>): Promise<Course> {
        // one way of saving new object to db, first we put it in memory and then call the save method
        // other option would be this.courseModel.create(course)
        const newCourse = new this.courseModel(course);

        await newCourse.save();

        // setting so that the version property is not returned as we don't need it
        return newCourse.toObject({ versionKey: false });
    }

}