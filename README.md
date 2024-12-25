
# **Task Timer**

Task Timer is a React Native app built with Expo, enabling users to create task rooms, manage tasks, and receive notifications for task reminders.

---

## **Setup Instructions**

1. Clone the repository:

   ```bash
   git clone https://github.com/Neel2107/task-timer.git
   cd task-timer
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npx expo start
   ```

4. Open the app:
   - **Development build:** Follow [Expo Development Build Guide](https://docs.expo.dev/develop/development-builds/introduction/).
   - **Android emulator or iOS simulator:** Follow [Expo's setup instructions](https://docs.expo.dev/workflow/android-studio-emulator/).
   - **Expo Go App:** Scan the QR code displayed after running `npx expo start`.

---

## **Assumptions**

- Users need notification permissions for task reminders.
- Notifications are scheduled based on task `starts_in` attributes, which may include days, hours, minutes, or seconds.
- Tasks and task rooms are retrieved via mock APIs (`api` module).
- There can be multiple task rooms at a time, and tasks are associated with specific rooms.

---

## **Technical Decisions**

1. **Architecture**: 
   - **File-based Routing**: Simplifies navigation with [Expo Router](https://docs.expo.dev/router/introduction/).
   - **Hooks**: Custom hooks like `useTasks` and `useAuth` centralize logic and maintain separation of concerns.

2. **Notifications**: 
   - **Expo Notifications**: Used for scheduling, canceling, and handling task reminders.
   - Custom notification categories are implemented for actions (`Done`, `Skip`).

3. **State Management**: 
   - **Context API**: For managing global state (e.g., task rooms).

4. **Styling**: 
   - **NativeWind**: Utility-first CSS framework for consistent, responsive UI.
   - Customizable themes for branding.

5. **Keyboard Handling**:
   - Ensures proper handling of the keyboard using `react-native-keyboard-controller` to prevent UI overlap.

6. **Task Scheduling**:
   - Notifications are uniquely identified by task IDs, ensuring no duplication or early triggers.

---

### **Features**

### **Task Rooms**
- Create new task rooms.
- View the list of existing rooms with timestamps.
- **Local Data Persistence**: Task room data is stored locally, ensuring that if the app is closed and reopened, the task rooms are retained.

### **Tasks**
- Fetch tasks for a specific room.
- "Get Next Task" feature fetches and schedules the next task.
- Display task details with scheduled notifications.
- **Pull-to-Refresh**: Users can refresh the task list by pulling down on the screen.

### **Notifications**
- Notifications trigger based on `starts_in` duration.
- Actionable buttons (`Done`, `Skip`) dismiss the notification.
- Custom notification icon enhances user experience.

### **Authentication**
- **Refresh Token Functionality**: Automatically handles token expiration by using a refresh token to acquire a new access token without requiring the user to log in again.
- **Token Validation at App Start**: On app launch, checks for valid tokens to determine if the user is already authenticated.
- **Secure Token Storage**: Authentication tokens (access and refresh tokens) are securely stored using **Expo Secure Store** to ensure data security.

### **Visual Enhancements**
- Custom app icon for a distinctive application identity.
- Custom splash screen for a professional look and feel during app launch.
- **Smooth Animations**: Button press animations implemented using **Reanimated** for a polished and responsive user experience.
- **High-Quality Assets**: High-resolution icons, images, and splash screens are used to provide a visually appealing and professional appearance.


## **Screen Recording**

[[Embedded screen recording here, showcasing the working app.]](https://github.com/user-attachments/assets/8f7a4f08-9d13-4c3a-a4a6-e79019a7a588)


## **Screenshots**

<img src="https://github.com/user-attachments/assets/522022f6-bc72-4945-b649-d5926853a3d1" alt="custom-app-icon" width="200"/>

<img src="https://github.com/user-attachments/assets/7399fb43-25ee-4a04-8750-f6711ce08de5" alt="custom-notification-icon" width="200"/>

<img src="https://github.com/user-attachments/assets/f3f01173-fbbb-4971-8aec-887c8eb9eb14" alt="custom-splash-image" width="200"/>

<img src="https://github.com/user-attachments/assets/4deaa64e-136b-4d98-ab14-188728acb0f0" alt="login-screen" width="200"/>

<img src="https://github.com/user-attachments/assets/4e8d0581-4a55-4225-9c65-fd1d68ea8e7e" alt="empty-task-rooms" width="200"/>

<img src="https://github.com/user-attachments/assets/7d60cc66-e6be-4937-ae7c-cbe0d6ad1867" alt="empty-room" width="200"/>

<img src="https://github.com/user-attachments/assets/4e2bca96-2c01-49f5-b4bd-be095ab6b04f" alt="task-rooms-list" width="200"/>

<img src="https://github.com/user-attachments/assets/52059107-e042-4f02-9bb9-99e38214851c" alt="tasks-list" width="200"/>

---

## **APK Link**
[Link](https://drive.google.com/drive/folders/1-c12nRCC4iD5grZ1msSnCM0pWPLthBw4?usp=sharing)

## **Credits**

- [Expo](https://expo.dev)
- [React Native](https://reactnative.dev)
- [NativeWind](https://nativewind.dev)
- [Expo Notifications](https://docs.expo.dev/versions/latest/sdk/notifications/)

