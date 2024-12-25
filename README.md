
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

## **Features**

### **Task Rooms**
- Create new task rooms.
- View the list of existing rooms with timestamps.

### **Tasks**
- Fetch tasks for a specific room.
- "Get Next Task" feature fetches and schedules the next task.
- Display task details with scheduled notifications.

### **Notifications**
- Notifications trigger based on `starts_in` duration.
- Actionable buttons (`Done`, `Skip`) dismiss the notification.

---

## **Screen Recording**

[Embedded screen recording here, showcasing the working app.]


## **Screenshots**

### Task Rooms
![Task Rooms Screenshot](link-to-image)

### Task Notifications
![Notification Screenshot](link-to-image)

---

## **Credits**

- [Expo](https://expo.dev)
- [React Native](https://reactnative.dev)
- [NativeWind](https://nativewind.dev)
- [Expo Notifications](https://docs.expo.dev/versions/latest/sdk/notifications/)
```
