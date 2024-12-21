#!/bin/bash

# Create the main project directory
mkdir -p e-learning-frontend/src

# Create directories for each module and their subdirectories
modules=("app/(auth)/login" "app/(auth)/register" "app/dashboard/student" "app/dashboard/instructor" "app/courses/[id]" "app/profile" "components/ui" "components/courses" "components/chat" "components/forum" "hooks" "lib/api" "lib/utils" "store")

for module in "${modules[@]}"; do
  mkdir -p "e-learning-frontend/src/$module"
done

# Create the files for each module
touch e-learning-frontend/src/app/\(auth\)/login/page.tsx
touch e-learning-frontend/src/app/\(auth\)/register/page.tsx
touch e-learning-frontend/src/app/dashboard/student/page.tsx
touch e-learning-frontend/src/app/dashboard/instructor/page.tsx
touch e-learning-frontend/src/app/courses/\[id\]/page.tsx
touch e-learning-frontend/src/app/courses/page.tsx
touch e-learning-frontend/src/app/profile/page.tsx
touch e-learning-frontend/src/app/layout.tsx

touch e-learning-frontend/src/components/ui/Button.tsx
touch e-learning-frontend/src/components/ui/Input.tsx
touch e-learning-frontend/src/components/ui/Card.tsx
touch e-learning-frontend/src/components/courses/CourseCard.tsx
touch e-learning-frontend/src/components/courses/CourseList.tsx
touch e-learning-frontend/src/components/chat/ChatWindow.tsx
touch e-learning-frontend/src/components/chat/MessageList.tsx
touch e-learning-frontend/src/components/forum/ThreadList.tsx
touch e-learning-frontend/src/components/forum/Reply.tsx

touch e-learning-frontend/src/hooks/useAuth.ts
touch e-learning-frontend/src/hooks/useSocket.ts

touch e-learning-frontend/src/lib/api/auth.ts
touch e-learning-frontend/src/lib/api/courses.ts
touch e-learning-frontend/src/lib/api/users.ts
touch e-learning-frontend/src/lib/utils/formatDate.ts
touch e-learning-frontend/src/lib/utils/validation.ts

touch e-learning-frontend/src/store/index.ts

# Create the shared types directory and files
mkdir -p shared/types
touch shared/types/course.ts
touch shared/types/user.ts
touch shared/types/chat.ts

# Create the configuration files
touch e-learning-frontend/package.json
touch e-learning-frontend/tsconfig.json
touch README.md

echo "Project structure created successfully."