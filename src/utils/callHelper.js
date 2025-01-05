import firestore from '@react-native-firebase/firestore';
import messaging from '@react-native-firebase/messaging';

// Function to start a call (stores call data in Firestore)
export const startCall = async (fromUserId, toUserId, callType) => {
    // Create a new call document in Firestore
    const callRef = firestore().collection('calls').doc();
    const callData = {
        fromUserId,
        toUserId,
        status: 'incoming',  // The call status is incoming initially
        startTime: firestore.FieldValue.serverTimestamp(),
        callType, // Could be 'voice' or 'video'
    };

    await callRef.set(callData);
    return callRef.id; // Return the new call document ID
};

// Function to send an incoming call notification using FCM
export const sendCallNotification = async (toUserId, callId) => {
    // Retrieve the FCM token for the recipient user (assume function to fetch token is implemented)
    const token = await getUserFCMToken(toUserId);

    const message = {
        to: token,
        notification: {
            title: 'Incoming Call',
            body: 'You have an incoming call',
        },
        data: {
            callId,  // Attach callId so the receiver can manage the call
        },
    };

    // Send the push notification
    await messaging().sendMessage(message);
};

// Function to get the FCM token for a user (you can store tokens in Firestore)
export const getUserFCMToken = async (userId) => {
    const userRef = firestore().collection('users').doc(userId);
    const userSnapshot = await userRef.get();

    if (userSnapshot.exists) {
        return userSnapshot.data().fcmToken;  // Assumes FCM token is stored in Firestore
    }

    throw new Error('User not found');
};

// Function to listen for incoming calls (FireStore listeners)
export const listenForIncomingCalls = (userId, onCallReceived) => {
    return firestore()
        .collection('calls')
        .where('toUserId', '==', userId)
        .where('status', '==', 'incoming')
        .onSnapshot((snapshot) => {
            snapshot.forEach((doc) => {
                const callData = doc.data();
                onCallReceived(callData);
            });
        });
};

// Function to update call status (answer, reject, end call)
export const updateCallStatus = async (callId, status) => {
    const callRef = firestore().collection('calls').doc(callId);
    await callRef.update({
        status,  // status could be 'answered', 'rejected', 'ended', etc.
        endTime: status === 'ended' ? firestore.FieldValue.serverTimestamp() : null,
    });
};

// Function to fetch a call by its ID
export const getCallById = async (callId) => {
    const callRef = firestore().collection('calls').doc(callId);
    const callSnapshot = await callRef.get();

    if (callSnapshot.exists) {
        return callSnapshot.data();
    }

    throw new Error('Call not found');
};

// Function to end a call (update Firestore call document)
export const endCall = async (callId) => {
    await updateCallStatus(callId, 'ended');
};
