FROM golang:1.25 AS build

WORKDIR /build
COPY go.* ./
COPY main.go ./

RUN go mod download
RUN go build -o ./ssg-example

FROM alpine
ARG GOOGLE_BOOK_API_KEY
ARG PORT
WORKDIR /app
COPY --from=build /build /app

CMD [ "./ssg-example" ]