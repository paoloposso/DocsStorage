package url

import (
	"github.com/paoloposso/docs_api/util"
)

type IService interface {
	ShortenURL(string) (string, error)
	GetUrl(string) (string, error)
}

type Service struct {
	repository    IRepository
	configService util.ConfigService
}

func NewService(repository IRepository, config util.ConfigService) IService {
	return Service{
		repository:    repository,
		configService: config,
	}
}

func (s Service) ShortenURL(url string) (string, error) {
	shortened := encode(url)

	if err := s.repository.Save(shortened, url); err != nil {
		return "", err
	}

	return shortened, nil
}

func (s Service) GetUrl(shortURL string) (string, error) {
	return s.repository.Find(shortURL)
}
