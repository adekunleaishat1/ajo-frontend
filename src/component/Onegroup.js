import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOnethrift } from "../services/Allthrift";

const Onegroup = () => {
  const [thrifts, setthrifts] = useState("");
  const route = useParams();
  const [onegroup, setonegroup] = useState([]);
  const { isgetting, allthrift, gettingerror } = useSelector(
    (state) => state.AllthriftSlice
  );
  const id = route.id;
  console.log(id);
  const dispatch = useDispatch();
  const get = JSON.parse(localStorage.getItem("link"));
  console.log(get.contributionLink);
  // useEffect(() => {
  //   getOnethrift(dispatch, id);
  //   console.log(isgetting);
  //   if (gettingerror) {
  //     alert("error fetching data");
  //   } else {
  //     // dispatch(getThrift)
  //   }

  // }, [])
  useEffect(() => {
    console.log(allthrift);
    if (allthrift) {
      let group = allthrift.find((el) => el._id === id);
      console.log(group);

      console.log(group.members);
      // let onegroup = group.members;
      setonegroup(group.members)
      console.log(onegroup);
    }
  }, [allthrift]);

  return (
    <>
      <div>
        <table className="table">
          <tr>
            <th>Members</th>
            <th>Payment details</th>
            <th>S/N</th>
          </tr>
          {(onegroup && onegroup.length > 0)  && (
              onegroup.map((el, i) => (
                <>
                  <tr key={i}>
                    <td>{el.username }</td>
                    <td>{el.amount}</td>
                    <td>{i + 1}</td>
                  </tr>
                </>
              ))
          )}
        </table>
        <div className="cont-link">
          <table className="link">
            <tr>
              <th>Group Link</th>
              <th>Copy</th>
            </tr>
            <tr>
              <td>{get.contributionLink}</td>
            </tr>
          </table>
        </div>
      </div>
    </>
  );
};

export default Onegroup;
