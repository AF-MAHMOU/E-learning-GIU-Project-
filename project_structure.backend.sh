#!/bin/bash

# Create additional subdirectories for the common module
mkdir -p e-learning-backend/src/common/decorators
mkdir -p e-learning-backend/src/common/interfaces
mkdir -p e-learning-backend/src/common/middleware
mkdir -p e-learning-backend/src/common/guards

# Create directories for each module
mkdir -p e-learning-backend/src/auth/dto
mkdir -p e-learning-backend/src/users/dto
mkdir -p e-learning-backend/src/users/schemas
mkdir -p e-learning-backend/src/courses/dto
mkdir -p e-learning-backend/src/courses/schemas
mkdir -p e-learning-backend/src/quizzes/dto
mkdir -p e-learning-backend/src/quizzes/schemas
mkdir -p e-learning-backend/src/chat/dto
mkdir -p e-learning-backend/src/chat/schemas
mkdir -p e-learning-backend/src/forums/dto
mkdir -p e-learning-backend/src/forums/schemas
mkdir -p e-learning-backend/src/notifications/dto
mkdir -p e-learning-backend/src/notifications/schemas
mkdir -p e-learning-backend/src/analytics/dto

# Create the files for each module
touch e-learning-backend/src/auth/dto/login.dto.ts
touch e-learning-backend/src/auth/dto/register.dto.ts
touch e-learning-backend/src/auth/jwt.strategy.ts
touch e-learning-backend/src/auth/roles.guard.ts

touch e-learning-backend/src/users/dto/create-user.dto.ts
touch e-learning-backend/src/users/dto/update-user.dto.ts
touch e-learning-backend/src/users/schemas/user.schema.ts

touch e-learning-backend/src/courses/dto/create-course.dto.ts
touch e-learning-backend/src/courses/dto/update-course.dto.ts
touch e-learning-backend/src/courses/schemas/course.schema.ts
touch e-learning-backend/src/courses/schemas/module.schema.ts

touch e-learning-backend/src/quizzes/dto/create-quiz.dto.ts
touch e-learning-backend/src/quizzes/dto/submit-quiz.dto.ts
touch e-learning-backend/src/quizzes/schemas/question.schema.ts
touch e-learning-backend/src/quizzes/schemas/quiz.schema.ts

touch e-learning-backend/src/chat/dto/message.dto.ts
touch e-learning-backend/src/chat/schemas/conversation.schema.ts
touch e-learning-backend/src/chat/schemas/message.schema.ts

touch e-learning-backend/src/forums/dto/create-thread.dto.ts
touch e-learning-backend/src/forums/dto/create-reply.dto.ts
touch e-learning-backend/src/forums/schemas/thread.schema.ts
touch e-learning-backend/src/forums/schemas/reply.schema.ts

touch e-learning-backend/src/notifications/dto/notification.dto.ts
touch e-learning-backend/src/notifications/schemas/notification.schema.ts

touch e-learning-backend/src/analytics/dto/analytics.dto.ts

touch e-learning-backend/src/common/decorators/roles.decorator.ts
touch e-learning-backend/src/common/interfaces/user.interface.ts
touch e-learning-backend/src/common/middleware/logger.middleware.ts
touch e-learning-backend/src/common/guards/roles.guard.ts

# Create the configuration files
touch e-learning-backend/README.md
touch e-learning-backend/package.json
touch e-learning-backend/tsconfig.json

echo "Additional project structure created successfully."