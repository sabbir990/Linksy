import React, { useEffect, useState } from 'react'
import { getCurrentUser } from '../Utils/getCurrentUser'
import { UserSchemaTypes } from '../Models/Users';
import { FriendRequestType } from '../Models/friendRequest';
import { ImSpinner } from 'react-icons/im';
import { FaRegUser } from 'react-icons/fa';
import toast from 'react-hot-toast';

export default function FriendRequests() {
  const [currentUser, setCurrentUser] = useState<any>({});
  const [allFriendRequests, setAllFriendRequests] = useState<FriendRequestType[] | []>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [friendRequestedUsersMoreInfo, setFriendRequestedUsersMoreInfo] = useState<UserSchemaTypes[] | []>([]);

  useEffect(() => {
    setIsLoading(true);
    getCurrentUser().then(result => {
      setCurrentUser(result)
    })
  }, [])

  const fetchFriendRequests = async (userEmail: string) => {
    try {
      const getFriendRequestsRequest = await fetch(
        `/api/get-friend-requests?userEmail=${encodeURIComponent(userEmail)}`,
        { method: "GET" }
      );

      const getFriendRequestsResponse = await getFriendRequestsRequest.json();

      if (getFriendRequestsResponse) {
        setIsLoading(false);

        const friendRequests = getFriendRequestsResponse.friendRequests;

        setAllFriendRequests(friendRequests);

        friendRequests.forEach(async (friendRequest: FriendRequestType) => {
          const getFullInfoRequest = await fetch(
            `/api/get-friend-requested-user-info?sender=${encodeURIComponent(friendRequest.sender)}`,
            { method: "GET" }
          );

          const getFullInfoResponse = await getFullInfoRequest.json();

          setFriendRequestedUsersMoreInfo(prevInfo => [
            ...prevInfo,
            getFullInfoResponse.user
          ]);
        });
      }

    } catch (err) {
      setIsLoading(false);
      console.error(err);
    }
  };

  const userEmail = currentUser?.user?.email;

  useEffect(() => {
    if (currentUser?.user) {
      fetchFriendRequests(userEmail);
    }
  }, [currentUser])

  const acceptFriendRequest = async(senderEmail: string) => {
    try{



    }catch(error){
      console.error(error)

    }
  }

  const rejectFriendRequest = async(senderEmail: string) => {
    try{
      const rejectFriendRequestRequest = await fetch(`/api/reject-friend-request?sender=${senderEmail}`, {method: "PATCH"});
      const rejectFriendRequestResponse = await rejectFriendRequestRequest.json();

      if(rejectFriendRequestResponse?.response?.modifiedCount > 0){
        toast.success("Friend request rejected successfully!");
        fetchFriendRequests(currentUser.user.email);
        return;
      }

      toast.error("Something went wrong! Please wait for some time and try again!")
    }catch(error){
      console.error(error)
    }
  }

  return (
    <div className="w-full bg-gray-100 rounded-md overflow-hidden">

      {isLoading ? (
        <div className="flex items-center justify-center py-8">
          <ImSpinner className="animate-spin text-indigo-600" size={22} />
        </div>
      ) : allFriendRequests.filter(request => request.status === "pending").length > 0 ? (

        <div className="flex flex-col divide-y divide-gray-200">

          {allFriendRequests
            .filter(request => request.status === "pending")
            .map((request, index) => {

              const requestedUser = friendRequestedUsersMoreInfo.find(
                user => user.email === request.sender
              );

              console.log(friendRequestedUsersMoreInfo);

              return (
                <div
                  key={index}
                  className="flex flex-col sm:flex-row sm:items-center gap-3 p-3 hover:bg-indigo-50 transition-colors duration-200"
                >

                  {/* Profile Avatar */}
                  <div className="w-11 h-11 shrink-0 rounded-full bg-indigo-200 flex items-center justify-center">
                    <FaRegUser className="text-indigo-700" size={19} />
                  </div>

                  {/* Request Details */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-800 truncate">
                      {requestedUser?.displayName || request.sender}
                    </h3>

                    <p className="text-xs text-gray-500">
                      @{requestedUser?.username || "Loading..."}
                    </p>

                    <p className="text-xs text-gray-400 mt-1">
                      {new Date(request.requestDate).toLocaleDateString()}
                    </p>
                  </div>

                  {/* Accept / Reject Buttons */}
                  <div className="flex flex-col items-center gap-2 shrink-0">
                    <button
                    onClick={() => {
                      acceptFriendRequest(request.sender);
                    }}
                      type="button"
                      className="px-4 cursor-pointer py-1.5 rounded-md bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-700 transition-colors"
                    >
                      Accept
                    </button>

                    <button
                    onClick={() => {
                      rejectFriendRequest(request.sender);
                    }}
                      type="button"
                      className="px-4 cursor-pointer py-1.5 rounded-md bg-red-100 text-red-600 text-xs font-semibold hover:bg-red-200 transition-colors"
                    >
                      Reject
                    </button>
                  </div>

                </div>
              );
            })}
        </div>
      ) : (
        <div className="py-8 text-center">
          <p className="text-sm font-medium text-gray-600">
            No pending friend requests.
          </p>
          <p className="text-xs text-gray-400 mt-1">
            New friend requests will appear here.
          </p>
        </div>
      )}

    </div>
  )

}
