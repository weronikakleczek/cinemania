package com.example.cmeurekaserver

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.cloud.netflix.eureka.server.EnableEurekaServer

@SpringBootApplication
@EnableEurekaServer
class CmEurekaServerApplication

fun main(args: Array<String>) {
    runApplication<CmEurekaServerApplication>(*args)
}
