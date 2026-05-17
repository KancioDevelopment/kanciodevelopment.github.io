# Kancio Development - Command Orchestrator (Makefile)
.PHONY: help install dev build preview clean release

# Default goal when running 'make' without arguments
.DEFAULT_GOAL := help

# Colored terminal helpers
CYAN   := \033[36m
GREEN  := \033[32m
YELLOW := \033[33m
RED    := \033[31m
RESET  := \033[0m

help:
	@echo ""
	@echo "  ${CYAN}🌟 Kancio Development - Make Command Center${RESET}"
	@echo "  ========================================="
	@echo "  ${YELLOW}Available commands:${RESET}"
	@echo ""
	@echo "  ${GREEN}make install${RESET}     - Install Node.js package dependencies"
	@echo "  ${GREEN}make dev${RESET}         - Launch local Vite development server"
	@echo "  ${GREEN}make build${RESET}       - Rebuild production assets (dist) & verify static files"
	@echo "  ${GREEN}make preview${RESET}     - Preview the compiled production build locally"
	@echo "  ${GREEN}make clean${RESET}       - Delete compiled build files (dist)"
	@echo "  ${GREEN}make release${RESET}     - Rebuild, stage changes, prompt for commit message, and push to GitHub"
	@echo ""

install:
	@echo "${CYAN}📦 Installing dependencies...${RESET}"
	npm install
	@echo "${GREEN}✅ Dependencies successfully installed!${RESET}"

dev:
	@echo "${CYAN}🚀 Launching local development server...${RESET}"
	npm run dev

build:
	@echo "${CYAN}🏗️  Building production bundles and copying static assets...${RESET}"
	npm run build
	@echo "${GREEN}✅ Production build completed successfully!${RESET}"

preview:
	@echo "${CYAN}👀 Starting local preview of production build...${RESET}"
	npm run preview

clean:
	@echo "${YELLOW}🧹 Cleaning up build artifacts (dist/)...${RESET}"
	rm -rf dist
	@echo "${GREEN}✅ Clean completed!${RESET}"

release: clean build
	@echo ""
	@echo "${CYAN}🚀 Initializing Kancio Release Pipeline...${RESET}"
	@echo "-----------------------------------------"
	@git status -s
	@echo "-----------------------------------------"
	@echo "${YELLOW}Staging all changes...${RESET}"
	git add -A
	@echo "${YELLOW}Prompting for commit message...${RESET}"
	@read -p "✏️  Enter commit message: " msg; \
	if [ -z "$$msg" ]; then \
		echo "${RED}❌ Commit message cannot be empty. Release aborted.${RESET}"; \
		exit 1; \
	fi; \
	echo "${CYAN}Creating commit: \"$$msg\"...${RESET}"; \
	git commit -m "$$msg"; \
	echo "${CYAN}Pushing changes to remote master branch...${RESET}"; \
	git push origin master; \
	echo ""
	@echo "${GREEN}🎉 Release successfully pushed!${RESET}"
	@echo "${GREEN}📲 GitHub Actions will now automatically deploy the build to kancio.com.${RESET}"
	@echo ""