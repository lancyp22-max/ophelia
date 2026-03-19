.PHONY: preview preview-mobile preview-all

preview:
	python3 scripts/capture_preview.py

preview-mobile:
	python3 scripts/capture_preview.py --width 390 --height 844 --output artifacts/preview-mobile.png

preview-all: preview preview-mobile
