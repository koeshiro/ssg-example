cp ../backend/docs/swagger.yaml ./api/swagger.yaml
docker run --rm \
  -v ${PWD}:/local openapitools/openapi-generator-cli generate \
  -i /local/api/swagger.yaml \
  -g typescript-fetch \
  -o /local/api/backend

rm ./api/swagger.yaml