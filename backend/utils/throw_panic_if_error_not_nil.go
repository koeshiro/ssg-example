package utils

func ThrowPanicIfErrorNotNil(err error) {
	if err != nil {
		panic(err)
	}
}
