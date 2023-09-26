package com.devmountain.courseScheduler.controllers;

import com.devmountain.courseScheduler.dtos.StudentDto;
import com.devmountain.courseScheduler.services.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/students")
public class StudentController {
    @Autowired
    private StudentService studentService;

    @PostMapping("/{courseId}/{userId}")
    public List<String> addStudent(@RequestBody StudentDto studentDto, @PathVariable Long userId, @PathVariable Long courseId) {
        return studentService.addStudent(studentDto, userId, courseId);
    }

    @Scheduled(fixedRate = 15000)
    @PostMapping("/fromWaiting")
    public void addFromWaitingList() {
        studentService.addFromWaitingList();
    }

    @PutMapping
    public List<String> updateStudent(@RequestBody StudentDto studentDto) {
        return studentService.updateStudent(studentDto);
    }

    @DeleteMapping("/{studentId}")
    public  List<String> deleteStudentById(@PathVariable Long studentId) {
        return studentService.deleteStudentById(studentId);
    }

    @GetMapping
    public List<StudentDto> getAllStudents() {
        return studentService.getAllStudents();
    }

    @GetMapping("/user/{userId}")
    public List<StudentDto> getStudentsByUserId(@PathVariable Long userId) {
        return studentService.getStudentsByUserId(userId);
    }

    @GetMapping("/course/{courseId}")
    public List<StudentDto> getStudentsByCourseId(@PathVariable Long courseId) {
        return studentService.getStudentsByCourseId(courseId);
    }

    @GetMapping("/{studentId}")
    public Optional<StudentDto> getStudentById(@PathVariable Long studentId) {
        return studentService.getStudentById(studentId);
    }

    @GetMapping("/course/{courseId}/count")
    public Long getCountCourse(@PathVariable Long courseId) {
        return studentService.getCountCourse(courseId);
    }

    @GetMapping("/course/{courseId}/count/attended")
    public Long getCountAttended(@PathVariable Long courseId) {
        return studentService.getCountAttended(courseId);
    }

    @GetMapping("/user/{userId}/course/{courseId}")
    public Optional<StudentDto> getStudentFromUserAndCourse(@PathVariable Long userId, @PathVariable Long courseId) {
        return studentService.getStudentFromUserAndCourse(userId, courseId);
    }
}