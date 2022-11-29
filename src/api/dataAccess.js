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
    `${dbUrl}/gizmos?_expand=gizmoCategory&_expand=user&_page=${[
      pageNumber,
    ]}&_limit=${limit}&_sort=${sortby}&_order=asc`
  );
  const gizmoData = await gizmoResponse.json();
  return gizmoData;
};

export const getSingleGizmo = async (gizmoId) => {
  const gizmoResponse = await fetch(`${dbUrl}/gizmos/${gizmoId}`);
  const gizmoData = await gizmoResponse.json();
  return gizmoData;
};

export const getGizmoQty = async () => {
  const gizmoResponse = await fetch(`${dbUrl}/gizmos?_page=1&_limit=1`);
  const gizmoLength = JSON.parse(gizmoResponse.headers.get("X-Total-Count"));
  return gizmoLength;
};

export const getUserGizmos = async (uid) => {
  const currentUserObj = getSingleUserInfo(uid);
  const gizmoResponse = await fetch(
    `${dbUrl}/gizmos/userId=${currentUserObj.id}`
  );
  const gizmoData = await gizmoResponse.json();
  return gizmoData;
};

export const createNewGizmo = async (newGizmoObj) => {
  const localUser = localStorage.getItem("capstone_user");
  const projectUserObject = JSON.parse(localUser);
  const uid = projectUserObject.uid;
  const copyGizmoObj = { ...newGizmoObj };
  copyGizmoObj.uid = uid;
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

export const getUserGizmoRequests = async (uid) => {
  const currentUserObj = getSingleUserInfo(uid);
  const gizmoResponse = await fetch(
    `${dbUrl}/gizmoRequests/userId=${currentUserObj.id}`
  );
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
  const gizmoResponse = await fetch(`${dbUrl}/users/uid=${uid}`);
  const gizmoData = await gizmoResponse.json();
  return gizmoData;
};

export const createNewUser = async (newUserObj) => {
  const localUser = localStorage.getItem("capstone_user");
  const projectUserObject = JSON.parse(localUser);
  const uid = projectUserObject.uid;
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
