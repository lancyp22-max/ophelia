.PHONY: preview preview-mobile preview-all backend-build backend-run ci-check repo-link-check

preview:
	python3 scripts/capture_preview.py --output artifacts/preview-desktop.txt

preview-mobile:
	python3 scripts/capture_preview.py --width 390 --height 844 --output artifacts/preview-mobile.txt

preview-all: preview preview-mobile

backend-build:
	mvn -B -ntp verify

backend-run:
	mvn -q spring-boot:run

repo-link-check:
	bash scripts/verify_repo_links.sh

ci-check: repo-link-check
	node --check script.js
	python3 scripts/capture_preview.py --dry-run
	mvn -B -ntp verify
