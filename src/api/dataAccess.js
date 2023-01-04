//

const dbUrl = "http://localhost:8088";

// ----------------------------- Gizmo db fetch -------------------------------

//the problem: I need to get a users uid and use that to expand on the gizmo data.

export const getPaginatedGizmosAndLocations = async (
  pageNumber,
  sortby,
  limit,
  filterOne
) => {
  const gizmoResponse = await fetch(
    `${dbUrl}/gizmos?isPublic=true${filterOne}&_expand=gizmoCategory&_expand=user&_embed=gizmoFavorites&_page=${[
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
    `${dbUrl}/gizmos/${gizmoId}?_expand=gizmoCategory&_expand=user&_embed=gizmoFavorites`
  );
  const gizmoData = await gizmoResponse.json();
  return gizmoData;
};

export const getGizmoQty = async () => {
  const gizmoResponse = await fetch(`${dbUrl}/gizmos?_page=1&_limit=1`);
  const gizmoLength = JSON.parse(gizmoResponse.headers.get("X-Total-Count"));
  return gizmoLength;
};

export const getPaginatedUserGizmos = async (
  pageNumber,
  sortby,
  limit,
  currentUserId
) => {
  const gizmoResponse = await fetch(
    `${dbUrl}/gizmos?userId=${currentUserId}&_expand=gizmoCategory&_embed=gizmoRentals&_embed=gizmoFavorites&_page=${[
      pageNumber,
    ]}&_limit=${limit}&_sort=${sortby}&_order=asc`
  );
  const gizmoData = await gizmoResponse.json();

  const gizmoArr = await Promise.all(
    gizmoData.map(async (gizmo) => {
      const gizmoObj = { ...gizmo };
      gizmoObj.gizmoRentals = gizmoObj.gizmoRentals.filter(
        (rental) => rental.isComplete === false
      );
      if (gizmoObj.gizmoRentals.length > 0) {
        const gizmoCurrentRental = gizmoObj.gizmoRentals[0];
        const userResponse = await fetch(
          `${dbUrl}/users/${gizmoCurrentRental.userId}`
        );
        gizmoCurrentRental.user = await userResponse.json();
      }
      return gizmoObj;
    })
  );

  const gizmoLength = JSON.parse(gizmoResponse.headers.get("X-Total-Count"));

  return { data: gizmoArr, totalCount: gizmoLength };
};
export const getPaginatedBorrowedGizmos = async (
  pageNumber,
  sortby,
  limit,
  currentUserId
) => {
  const gizmoResponse = await fetch(
    `${dbUrl}/gizmoRentals?userId=${currentUserId}&isComplete=false&_expand=gizmo&_embed=gizmoFavorites&_page=${[
      pageNumber,
    ]}&_limit=${limit}&_sort=${sortby}&_order=asc`
  );
  const gizmoData = await gizmoResponse.json();

  const gizmoCatagories = await getAllGizmoCategories();

  const gizmoArr = await Promise.all(
    gizmoData.map(async (rental) => {
      const copyRental = { ...rental };
      const newGizmo = copyRental.gizmo;

      newGizmo.gizmoCategory = gizmoCatagories.find(
        (cat) => cat.id === newGizmo.gizmoCategoryId
      );

      return newGizmo;
    })
  );
  const gizmoLength = JSON.parse(gizmoResponse.headers.get("X-Total-Count"));

  return { data: gizmoArr, totalCount: gizmoLength };
};

export const getPaginatedFavoritedGizmos = async (
  pageNumber,
  sortby,
  limit,
  currentUserId
) => {
  const gizmoResponse = await fetch(
    `${dbUrl}/gizmoFavorites?userId=${currentUserId}&_expand=gizmo&_page=${[
      pageNumber,
    ]}&_limit=${limit}&_sort=${sortby}&_order=asc`
  );
  const gizmoData = await gizmoResponse.json();

  const gizmoCatagories = await getAllGizmoCategories();

  const gizmoArr = gizmoData.map((rental) => {
    const copyRental = { ...rental };
    const newGizmo = copyRental.gizmo;

    rental.gizmoCategory = gizmoCatagories.find(
      (cat) => cat.id === newGizmo.gizmoCategoryId
    );
    return newGizmo;
  });

  const gizmoLength = JSON.parse(gizmoResponse.headers.get("X-Total-Count"));

  return { data: gizmoArr, totalCount: gizmoLength };
};
// export const getPaginatedUserInventory = async (pageNumber, sortby, limit) => {
//   const localUser = localStorage.getItem("capstone_user");
//   const projectUserObject = JSON.parse(localUser);
//   //uid aka firebase uid
//   const uid = projectUserObject.uid;
//   const currentUserObj = await getSingleUserInfo(uid);
//   const gizmoResponse = await fetch(
//     `${dbUrl}/gizmos?userId=${
//       currentUserObj.id
//     }&_expand=gizmoCategory&_page=${[
//       pageNumber,
//     ]}&_limit=${limit}&_sort=${sortby}&_order=asc`
//   );
//   const gizmoData = await gizmoResponse.json();

//   const gizmoCatagories = await getAllGizmoCategories();

//   const gizmoArr = gizmoData.map((rental) => {
//     const rentalObj = { ...rental };
//     rental.gizmoCategory = gizmoCatagories.find(
//       (cat) => cat.id === rentalObj.gizmo.gizmoCategoryId
//     );
//     return rentalObj;
//   });

//   const gizmoLength = JSON.parse(gizmoResponse.headers.get("X-Total-Count"));

//   return { data: gizmoArr, totalCount: gizmoLength };
// };

export const createNewGizmo = async (newGizmoObj, currentUserId) => {
  //copy the gizmoObj param
  const copyGizmoObj = { ...newGizmoObj };
  //assign the gizmoObj the current userId
  copyGizmoObj.userId = currentUserId;

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

export const createGizmoRequest = async (requestObj, currentUserId) => {
  const localUser = localStorage.getItem("capstone_user");
  const projectUserObject = JSON.parse(localUser);
  const uid = projectUserObject.uid;

  //use local uid to fetch userId from database table

  //copy the gizmoObj param
  const copyRequestObj = { ...requestObj };
  //assign the gizmoObj the current userId
  copyRequestObj.userId = currentUserId;

  const gizmoResponse = await fetch(`${dbUrl}/gizmoRequests/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestObj),
  });
};

export const getPendingUserGizmoRequests = async (currentUserId) => {
  const gizmoResponse = await fetch(
    `${dbUrl}/gizmoRequests?userId=${currentUserId}&requestStatus=pending&_expand=gizmo&_expand=user`
  );
  const requestData = await gizmoResponse.json();

  const gizmoArr = await Promise.all(
    requestData.map(async (request) => {
      const requestObj = { ...request };

      const userResponse = await fetch(
        `${dbUrl}/users/${requestObj.gizmo.userId}`
      );
      requestObj.ownerUser = await userResponse.json();
      return requestObj;
    })
  );

  return gizmoArr;
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

export const getSingleUserInfo = async (id) => {
  const gizmoResponse = await fetch(`${dbUrl}/users/${id}`);
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

export const getCurrentUserFromDb = async () => {
  const currentLocalUser = getCurrentUserFromLocal();
  const uid = currentLocalUser?.uid;
  const currentUserProfile = await fetch(`${dbUrl}/users?uid=${uid}`);
  const currentUserJson = await currentUserProfile.json();

  return currentUserJson[0];
};

export const getRequestsForSingleUsersGizmos = async (currentUserId) => {
  const allRequestsResponse = await fetch(
    `${dbUrl}/gizmoRequests?requestStatus=pending&_expand=gizmo&_expand=user`
  );
  const allRequestArr = await allRequestsResponse.json();

  const filteredRequests = allRequestArr.filter(
    (request) => request.gizmo.userId === currentUserId
  );

  return filteredRequests;
};

export const createGizmoRental = async (rentalObj) => {
  const gizmoResponse = await fetch(`${dbUrl}/gizmoRentals/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(rentalObj),
  });
};

export const getUpcomingRentals = async (currentUserId) => {
  const gizmoResponse = await fetch(
    `${dbUrl}/gizmoRentals?isComplete=false&_expand=gizmo&_expand=user`
  );
  const rentalData = await gizmoResponse.json();
  const filteredRentals = rentalData.filter((rental) => {
    const today = Date.now();
    const todayDate = new Date(today);
    const startDate = new Date(rental.startDate);
    if (
      (rental.gizmo.userId === currentUserId && startDate > todayDate) ||
      (rental.userId === currentUserId && startDate > todayDate)
    ) {
      return rental;
    }
  });

  const rentalArray = await Promise.all(
    filteredRentals.map(async (request) => {
      const requestObj = { ...request };

      const userResponse = await fetch(
        `${dbUrl}/users/${requestObj.gizmo.userId}`
      );
      requestObj.ownerUser = await userResponse.json();
      return requestObj;
    })
  );

  return rentalArray;
};

export const getOngoingRentals = async (currentUserId) => {
  const gizmoResponse = await fetch(
    `${dbUrl}/gizmoRentals?isComplete=false&_expand=gizmo&_expand=user`
  );
  const rentalData = await gizmoResponse.json();
  const filteredRentals = rentalData.filter((rental) => {
    const today = Date.now();
    const todayDate = new Date(today);
    const startDate = new Date(rental.startDate);
    if (
      (rental.gizmo.userId === currentUserId && startDate < todayDate) ||
      (rental.userId === currentUserId && startDate < todayDate)
    ) {
      return rental;
    }
  });

  const loanArray = await Promise.all(
    filteredRentals.map(async (request) => {
      const requestObj = { ...request };

      const userResponse = await fetch(
        `${dbUrl}/users/${requestObj.gizmo.userId}`
      );
      requestObj.ownerUser = await userResponse.json();
      return requestObj;
    })
  );

  return loanArray;
};

export const deleteGizmoRental = async (rentalId) => {
  const gismoResponse = await fetch(`${dbUrl}/gizmoRentals/${rentalId}`, {
    method: "DELETE",
  });
};

export const createGizmoFavorite = async (gizmoFavorite) => {
  const favoriteResponse = await fetch(`${dbUrl}/gizmoFavorites`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(gizmoFavorite),
  });
};

export const deleteGizmoFavorite = async (gizmoFavoriteId) => {
  const favoriteResponse = await fetch(
    `${dbUrl}/gizmoFavorites/${gizmoFavoriteId}`,
    {
      method: "DELETE",
    }
  );

  return favoriteResponse;
};
