FROM golang:1.24 AS build

WORKDIR /app
COPY go.* ./
COPY *.go ./

RUN go mod download
RUN go install github.com/swaggo/swag/cmd/swag@v1.16.4
RUN /go/bin/swag init --parseDependency
RUN CGO_ENABLED=0 go build -o ./ssg-example main.go
RUN CGO_ENABLED=0 go build -o ./kafka-producer ./kafka-producer/main.go

FROM alpine
ARG GOOGLE_BOOK_API_KEY
ARG PORT
WORKDIR /app
COPY --from=build /app/docs/swagger.json /app/docs/swagger.json
COPY --from=build /app/docs/swagger.yaml /app/docs/swagger.yaml
COPY --from=build /app/ssg-example /app/ssg-example
COPY --from=build /app/kafka-producer /app/kafka-producer

CMD ["/app/ssg-example"]