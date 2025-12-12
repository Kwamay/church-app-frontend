import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Card } from "primereact/card";
import { Tag } from "primereact/tag";
import { getAllMember } from "../redaux/actions/memberAction";
import "primeicons/primeicons.css";

const calculateDaysLeftInMonth = (dateString) => {
  if (!dateString) return { days: "N/A", numericDays: Infinity };

  try {
    const birthDate = new Date(dateString);
    if (isNaN(birthDate.getTime())) {
      console.warn(`Invalid date format encountered: ${dateString}`);
      return { days: "Invalid Date", numericDays: Infinity };
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const currentYear = today.getFullYear();
    const birthMonth = birthDate.getMonth();
    const birthDay = birthDate.getDate();

    const currentMonth = today.getMonth();
    if (birthMonth !== currentMonth) {
      return null;
    }
    const birthdayThisYear = new Date(currentYear, birthMonth, birthDay);
    birthdayThisYear.setHours(0, 0, 0, 0);

    const diffTime = birthdayThisYear.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    let displayDays;
    if (diffDays === 0) {
      displayDays = "Today";
    } else if (diffDays < 0) {
      displayDays = "Passed";
    } else {
      displayDays = `${diffDays} day${diffDays > 1 ? "s" : ""}`;
    }

    return { days: displayDays, numericDays: diffDays };
  } catch (error) {
    console.error(`Error processing date: ${dateString}`, error);
    return { days: "Error", numericDays: Infinity };
  }
};

const formatBirthDay = (dateString) => {
  if (!dateString) return "N/A";
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "Invalid Date";
    return date.toLocaleDateString(undefined, {
      month: "long",
      day: "numeric",
    });
  } catch (error) {
    console.error("Error parsing date:", dateString, error);
    return "Error";
  }
};

export default function BirthdayReminder() {
  const dispatch = useDispatch();
  const {
    members,
    loading: membersLoading,
    error: membersError,
  } = useSelector((state) => state.members);

  const [birthdaysThisMonth, setBirthdaysThisMonth] = useState([]);
  const [currentMonthName, setCurrentMonthName] = useState("");

  useEffect(() => {
    
      dispatch(getAllMember());
    
  }, [dispatch]);

  useEffect(() => {
    if (members && members.length > 0) {
      const today = new Date();
      const currentMonth = today.getMonth() + 1;
      setCurrentMonthName(
        today.toLocaleDateString(undefined, { month: "long" })
      );

      const filteredAndProcessed = members
        .map((member) => {
          if (!member || !member.id || !member.date) {
            console.warn(
              "Skipping member due to missing data (id or date):",
              member
            );
            return null;
          }

          try {
            const birthDate = new Date(member.date);
            if (isNaN(birthDate.getTime())) {
              console.warn(
                `Skipping member ${member.id} due to invalid date: ${member.date}`
              );
              return null;
            }

            const birthMonth = birthDate.getMonth() + 1;
            if (birthMonth === currentMonth) {
              const daysLeftInfo = calculateDaysLeftInMonth(birthDate);
              if (daysLeftInfo) {
                return {
                  ...member,
                  daysLeftDisplay: daysLeftInfo.days,
                  daysLeftNumeric: daysLeftInfo.numericDays,
                };
              }
            }
            return null;
          } catch (error) {
            console.error(
              `Error processing member ${member.id} date: ${member.date}`,
              error
            );
            return null;
          }
        })
        .filter((member) => member !== null && member.daysLeftNumeric >= -5);

      filteredAndProcessed.sort(
        (a, b) => a.daysLeftNumeric - b.daysLeftNumeric
      );

      setBirthdaysThisMonth(filteredAndProcessed);
    } else {
      setBirthdaysThisMonth([]);
    }
  }, [members]);
  const profilePictureTemplate = (rowData) => (
    <img
      src={rowData.profile_picture || "https://via.placeholder.com/40"}
      alt="Profile"
      style={{
        width: "40px",
        height: "40px",
        borderRadius: "50%",
        objectFit: "cover",
      }}
    />
  );

  const nameTemplate = (rowData) => {
    return `${rowData.first_name || ""} ${rowData.surname || ""}`.trim();
  };

  const birthDayTemplate = (rowData) => {
    return formatBirthDay(rowData.date);
  };

  const daysLeftTemplate = (rowData) => {
    let severity = "info";
    if (rowData.daysLeftDisplay === "Today") severity = "success";
    if (rowData.daysLeftDisplay === "Passed") severity = "secondary";
    if (
      rowData.daysLeftDisplay === "Error" ||
      rowData.daysLeftDisplay === "Invalid Date" ||
      rowData.daysLeftDisplay === "N/A"
    )
      severity = "danger";

    return <Tag value={rowData.daysLeftDisplay} severity={severity} />;
  };

  return (
    <Card
      title={`Upcoming Birthdays - ${currentMonthName}`}
      className="shadow-md rounded-lg"
    >
      <div className="p-4">
        {membersLoading && (
          <div className="text-center p-4">
            <i
              className="pi pi-spin pi-spinner"
              style={{ fontSize: "2em" }}
            ></i>
            <p className="mt-2">Loading Members...</p>
          </div>
        )}

        {membersError && !membersLoading && (
          <p className="text-red-500 p-4 text-center">
            <i className="pi pi-exclamation-triangle mr-2"></i>
            Error loading members:{" "}
            {membersError.message || "An unknown error occurred."}
          </p>
        )}

        {!membersLoading && !membersError && (
          <>
            {birthdaysThisMonth.length > 0 ? (
              <DataTable
                value={birthdaysThisMonth}
                paginator
                rows={10}
                rowsPerPageOptions={[5, 10, 20, 50]}
                className="p-datatable-sm"
                sortField="daysLeftNumeric"
                sortOrder={1}
                responsiveLayout="scroll"
                dataKey="id"
                emptyMessage="This message should not appear due to outer check"
              >
                <Column
                  header="Pic"
                  body={profilePictureTemplate}
                  style={{ width: "10%", flexGrow: 0, flexShrink: 0 }}
                />
                <Column
                  header="Name"
                  body={nameTemplate}
                  sortable
                  field="first_name"
                  style={{ width: "25%" }}
                />
                <Column
                  field="phone_number"
                  header="Phone"
                  style={{ width: "20%" }}
                />
                <Column
                  header="Birthday"
                  body={birthDayTemplate}
                  sortable
                  field="date"
                  style={{ width: "20%" }}
                />
                <Column
                  header="Status / Days Left"
                  body={daysLeftTemplate}
                  sortable
                  field="daysLeftNumeric"
                  style={{ width: "25%" }}
                />
              </DataTable>
            ) : (
              <div className="text-center p-4 text-gray-500">
                <i
                  className="pi pi-calendar-times mr-2"
                  style={{ fontSize: "1.2rem" }}
                ></i>
                No upcoming birthdays found for {currentMonthName}.
              </div>
            )}
          </>
        )}
      </div>
    </Card>
  );
}
