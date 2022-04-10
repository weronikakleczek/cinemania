package com.example.cmsurveys

import org.slf4j.LoggerFactory
import org.springframework.kafka.annotation.KafkaListener
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class ExampleSurveyController {

    @KafkaListener(
        topics = ["foo-topic"],
        groupId = "foo"
    )
    fun exampleEndpoint(message: String): Unit {
        println("Got new message: $message")
    }
}