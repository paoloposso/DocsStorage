package util

import (
	"os"
	"strconv"
	"time"
)

type ConfigService interface {
	GetMongoDbTimeOut() time.Duration
}

type EnvironmentConfigService struct{}

func (ecs EnvironmentConfigService) GetMongoDbTimeOut() time.Duration {
	t := os.Getenv("MONGODB_TIMEOUT")

	if res, err := strconv.Atoi(t); err != nil {
		return 10 * time.Second
	} else {
		return time.Duration(res) * time.Second
	}
}
