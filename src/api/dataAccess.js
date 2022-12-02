//

const dbUrl = "http://localhost:8088";

// ----------------------------- Gizmo db fetch -------------------------------

//the problem: I need to get a users uid and use that to expand on the gizmo data.

export const getPaginatedGizmosAndLocations = async (
  pageNumber,
  sortby,
  limit
) => {
  const gizmoResponse = await fetch(
    `${dbUrl}/gizmos?isPublic=true&_expand=gizmoCategory&_expand=user&_page=${[
      pageNumber,
    ]}&_limit=${limit}&_sort=${sortby}&_order=asc`
  );
  const gizmoData = await gizmoResponse.json();

  const gizmoLength = JSON.parse(gizmoResponse.headers.get("X-Total-Count"));

  return { data: gizmoData, totalCount: gizmoLength };
};

//get user gizmo categories

export const getSingleGizmo = async (gizmoId) => {
  const gizmoResponse = await fetch(
    `${dbUrl}/gizmos/${gizmoId}?_expand=gizmoCategory&_expand=user`
  );
  const gizmoData = await gizmoResponse.json();
  return gizmoData;
};

export const getGizmoQty = async () => {
  const gizmoResponse = await fetch(`${dbUrl}/gizmos?_page=1&_limit=1`);
  const gizmoLength = JSON.parse(gizmoResponse.headers.get("X-Total-Count"));
  return gizmoLength;
};

export const getPaginatedUserGizmos = async (pageNumber, sortby, limit) => {
  const localUser = localStorage.getItem("capstone_user");
  const projectUserObject = JSON.parse(localUser);
  //uid aka firebase uid
  const uid = projectUserObject.uid;
  const currentUserObj = await getSingleUserInfo(uid);
  const gizmoResponse = await fetch(
    `${dbUrl}/gizmos?userId=${currentUserObj.id}&_expand=gizmoCategory&_page=${[
      pageNumber,
    ]}&_limit=${limit}&_sort=${sortby}&_order=asc`
  );
  const gizmoData = await gizmoResponse.json();

  const gizmoLength = JSON.parse(gizmoResponse.headers.get("X-Total-Count"));

  return { data: gizmoData, totalCount: gizmoLength };
};

export const createNewGizmo = async (newGizmoObj) => {
  //get local uid
  const localUser = localStorage.getItem("capstone_user");
  const projectUserObject = JSON.parse(localUser);
  const uid = projectUserObject.uid;

  //use local uid to fetch userId from database table
  const userProfile = await getSingleUserInfo(uid);
  const userId = userProfile.id;

  //copy the gizmoObj param
  const copyGizmoObj = { ...newGizmoObj };
  //assign the gizmoObj the current userId
  copyGizmoObj.userId = userId;

  //send gizmoObj to db
  const gizmoResponse = await fetch(`${dbUrl}/gizmos/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(copyGizmoObj),
  });
  const gizmoData = await gizmoResponse.json();
  return gizmoData;
};
export const updateGizmo = async (gizmoId, gizmoObj) => {
  const gizmoResponse = await fetch(`${dbUrl}/gizmos/${gizmoId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(gizmoObj),
  });
  const gizmoData = await gizmoResponse.json();
};

export const deleteGizmo = async (gizmoId) => {
  const gizmoResponse = await fetch(`${dbUrl}/gizmos/${gizmoId}`, {
    method: "DELETE",
  });
  const gizmoData = await gizmoResponse.json();
};

export const getAllGizmoCategories = async () => {
  const gizmoResponse = await fetch(`${dbUrl}/gizmoCategories/`);
  const gizmoData = await gizmoResponse.json();
  return gizmoData;
};

export const createGizmoRequest = async (requestObj) => {
  const localUser = localStorage.getItem("capstone_user");
  const projectUserObject = JSON.parse(localUser);
  const uid = projectUserObject.uid;

  //use local uid to fetch userId from database table
  const userProfile = await getSingleUserInfo(uid);
  const userId = userProfile.id;

  //copy the gizmoObj param
  const copyRequestObj = { ...requestObj };
  //assign the gizmoObj the current userId
  copyRequestObj.userId = userId;

  const gizmoResponse = await fetch(`${dbUrl}/gizmoRequests/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestObj),
  });
};

export const getPendingUserGizmoRequests = async () => {
  const localUser = localStorage.getItem("capstone_user");
  const localUserObj = JSON.parse(localUser);
  const currentUserObj = await getSingleUserInfo(localUserObj.uid);
  const gizmoResponse = await fetch(
    `${dbUrl}/gizmoRequests?userId=${currentUserObj.id}&requestStatus=pending&_expand=gizmo&_expand=user`
  );
  const gizmoData = await gizmoResponse.json();
  return gizmoData;
};

export const getSingleGizmoRequest = async (id) => {
  const gizmoResponse = await fetch(`${dbUrl}/gizmoRequests/${id}`);
  const gizmoData = await gizmoResponse.json();
  return gizmoData;
};

export const updateGizmoRequest = async (requestId, gizmoRequestObj) => {
  const gizmoResponse = await fetch(`${dbUrl}/gizmoRequests/${requestId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(gizmoRequestObj),
  });
  const gizmoData = await gizmoResponse.json();
};

export const deleteGizmoRequest = async (requestId) => {
  const gizmoResponse = await fetch(`${dbUrl}/gizmoRequests/${requestId}`, {
    method: "DELETE",
  });
  const gizmoData = await gizmoResponse.json();
};

// ----------------------------- user db fetch -------------------------------

export const getSingleUserInfo = async (uid) => {
  const gizmoResponse = await fetch(`${dbUrl}/users?uid=${uid}`);
  const gizmoData = await gizmoResponse.json();
  return gizmoData[0];
};

export const createNewUser = async (newUserObj) => {
  const localUser = localStorage.getItem("capstone_user");
  const projectUserObject = JSON.parse(localUser);
  //uid aka firebase uid
  const uid = projectUserObject.uid;
  //add firebase uid to newUserObj from "create Profile" form
  const copyUserObj = { ...newUserObj };
  copyUserObj.uid = uid;
  copyUserObj.email = projectUserObject.email;
  const gizmoResponse = await fetch(`${dbUrl}/users/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(copyUserObj),
  });
  const gizmoData = await gizmoResponse.json();
  return gizmoData;
};

export const checkForUserInfo = async () => {
  const localUser = localStorage.getItem("capstone_user");
  const projectUserObject = JSON.parse(localUser);
  const uid = projectUserObject?.uid;
  const currentUserProfile = await fetch(`${dbUrl}/users?uid=${uid}`);
  const currentUserJson = await currentUserProfile.json();
  if (currentUserJson.length === 0) {
    return false;
  } else {
    return true;
  }
};

export const getCurrentUserFromLocal = () => {
  const localUser = localStorage.getItem("capstone_user");
  const localUserObj = JSON.parse(localUser);
  return localUserObj;
};
