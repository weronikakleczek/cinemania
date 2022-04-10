package com.example.cmsurveys

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.cloud.netflix.eureka.EnableEurekaClient

@SpringBootApplication
@EnableEurekaClient
class CmSurveysApplication

fun main(args: Array<String>) {
    runApplication<CmSurveysApplication>(*args)
}
