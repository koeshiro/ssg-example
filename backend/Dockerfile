FROM --platform=linux/amd64 golang:1.24 AS build

WORKDIR /app
COPY go.* ./
COPY *.go ./

RUN go mod download
RUN GOOS=linux GOARCH=amd64 go build -o ./ssg-example

FROM alpine
ARG GOOGLE_BOOK_API_KEY
ARG PORT
WORKDIR /app
COPY --from=build /app/* /app/ssg-example

CMD ["/app/ssg-example"]