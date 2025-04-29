import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Card } from "primereact/card";
import { Tag } from "primereact/tag";
import { getAllMember } from "../redaux/actions/memberAction"; // Adjust path if needed based on your project structure
import "primeicons/primeicons.css"; // Ensure PrimeIcons CSS is imported (usually done globally)

// --- Helper Functions ---

/**
 * Calculates the number of days remaining until the next birthday within the current month.
 * @param {string | Date} dateString - The birth date (e.g., 'YYYY-MM-DD' or Date object).
 * @returns {object | null} - { days: string, numericDays: number } or null if not in the current month.
 *                    'days' is for display ("Today", "Passed", "X days").
 *                    'numericDays' is for sorting (negative for passed, 0 for today, positive for upcoming, Infinity for errors).
 */
const calculateDaysLeftInMonth = (dateString) => {
  // Return specific object for N/A or invalid inputs for consistent handling
  if (!dateString) return { days: "N/A", numericDays: Infinity };

  try {
    const birthDate = new Date(dateString);
    // Check if the date is valid after parsing
    if (isNaN(birthDate.getTime())) {
      console.warn(`Invalid date format encountered: ${dateString}`);
      return { days: "Invalid Date", numericDays: Infinity };
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize today to the start of the day

    const currentYear = today.getFullYear();
    const birthMonth = birthDate.getMonth(); // 0-indexed
    const birthDay = birthDate.getDate();

    // Check if birthday month is the current month
    const currentMonth = today.getMonth(); // 0-indexed
    if (birthMonth !== currentMonth) {
      return null; // Indicate it's not relevant for this month's reminder
    }

    // Calculate the date of the birthday this year
    const birthdayThisYear = new Date(currentYear, birthMonth, birthDay);
    birthdayThisYear.setHours(0, 0, 0, 0); // Normalize birthday to start of the day

    // Calculate difference in time and days
    const diffTime = birthdayThisYear.getTime() - today.getTime();
    // Use Math.ceil to ensure that even a few hours difference into the next day counts as 1 day
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    let displayDays;
    if (diffDays === 0) {
      displayDays = "Today";
    } else if (diffDays < 0) {
      // Birthday already passed this month
      displayDays = "Passed";
    } else {
      // Upcoming birthday
      displayDays = `${diffDays} day${diffDays > 1 ? 's' : ''}`;
    }

    // Return the calculated data
    return { days: displayDays, numericDays: diffDays };

  } catch (error) {
    // Log error and return an error state
    console.error(`Error processing date: ${dateString}`, error);
    return { days: "Error", numericDays: Infinity };
  }
};


/**
 * Formats a date string or Date object to show Month and Day (e.g., "April 15").
 * Handles potential errors during parsing or formatting.
 * @param {string | Date} dateString - The date.
 * @returns {string} - Formatted date, "Invalid Date", "N/A", or "Error".
 */
const formatBirthDay = (dateString) => {
  if (!dateString) return "N/A";
  try {
    const date = new Date(dateString);
    // Check if the date is valid after parsing
    if (isNaN(date.getTime())) return "Invalid Date";
    // Format to Month Day (e.g., "April 15")
    return date.toLocaleDateString(undefined, { month: 'long', day: 'numeric' });
  } catch (error) {
    console.error("Error parsing date:", dateString, error);
    return "Error";
  }
};

// --- Component ---

export default function BirthdayReminder() {
  const dispatch = useDispatch();
  // Use specific names for loading/error states from the members slice
  const { members, loading: membersLoading, error: membersError } = useSelector((state) => state.members);

  const [birthdaysThisMonth, setBirthdaysThisMonth] = useState([]);
  const [currentMonthName, setCurrentMonthName] = useState("");

  // Effect Hook 1: Fetch members data if needed
  useEffect(() => {
    // Fetch only if members array doesn't exist or is empty, AND not currently loading
    if ((!members || members.length === 0) && !membersLoading) {
      dispatch(getAllMember());
    }
    // Dependencies: dispatch action, members array reference, loading status
  }, [dispatch, members, membersLoading]);

  // Effect Hook 2: Process members when the 'members' array changes
  useEffect(() => {
    // Proceed only if members data is available and not empty
    if (members && members.length > 0) {
      const today = new Date();
      const currentMonth = today.getMonth() + 1; // 1-indexed month for comparison
      // Set the current month name for the Card title
      setCurrentMonthName(today.toLocaleDateString(undefined, { month: 'long' }));

      // Process the members list: map, filter, sort
      const filteredAndProcessed = members
        .map((member) => {
          // Basic validation for member object and required fields
          if (!member || !member.id || !member.date) {
             console.warn("Skipping member due to missing data (id or date):", member);
             return null;
          }

          try {
            const birthDate = new Date(member.date);
            // Skip if date is invalid
            if (isNaN(birthDate.getTime())) {
               console.warn(`Skipping member ${member.id} due to invalid date: ${member.date}`);
               return null;
            }

            const birthMonth = birthDate.getMonth() + 1; // 1-indexed

            // Check if the birthday is in the current calendar month
            if (birthMonth === currentMonth) {
              // Calculate how many days left (or passed)
              const daysLeftInfo = calculateDaysLeftInMonth(birthDate);
              // If calculation was successful (not null)
              if (daysLeftInfo) {
                 // Return a new object combining original member data and calculated days info
                 return {
                    ...member,
                    daysLeftDisplay: daysLeftInfo.days,    // e.g., "Today", "Passed", "3 days"
                    daysLeftNumeric: daysLeftInfo.numericDays, // e.g., 0, -2, 3 (for sorting)
                 };
              }
            }
            // Return null if not in the current month or if calculation failed
            return null;
          } catch (error) {
            // Log error if date processing fails for a specific member
            console.error(`Error processing member ${member.id} date: ${member.date}`, error);
            return null;
          }
        })
        // Filter out null entries AND birthdays that passed more than 5 days ago
        .filter(member => member !== null && member.daysLeftNumeric >= -5);

      // Sort the results: Today first, then upcoming days (1, 2, ...), then passed days (-1 to -5)
      filteredAndProcessed.sort((a, b) => a.daysLeftNumeric - b.daysLeftNumeric);

      // Update the state with the final list
      setBirthdaysThisMonth(filteredAndProcessed);
    } else {
      // If members array is empty or null, clear the birthday list
      setBirthdaysThisMonth([]);
    }
    // Dependency: This effect runs whenever the 'members' array reference changes
  }, [members]);

  // --- Templates for DataTable Columns ---

  // Template for Profile Picture column
  const profilePictureTemplate = (rowData) => (
    <img
      src={rowData.profile_picture || "https://via.placeholder.com/40"} // Default placeholder
      alt="Profile"
      style={{ width: "40px", height: "40px", borderRadius: "50%", objectFit: 'cover' }} // Added objectFit
    />
  );

  // Template for Name column (combines first and surname)
  const nameTemplate = (rowData) => {
    return `${rowData.first_name || ''} ${rowData.surname || ''}`.trim(); // Trim ensures no extra space if one name is missing
  };

  // Template for Birthday column (uses formatBirthDay helper)
  const birthDayTemplate = (rowData) => {
    return formatBirthDay(rowData.date);
  };

  // Template for Status / Days Left column (uses Tag component)
  const daysLeftTemplate = (rowData) => {
    let severity = "info"; // Default color for upcoming
    if (rowData.daysLeftDisplay === "Today") severity = "success"; // Green for today
    if (rowData.daysLeftDisplay === "Passed") severity = "secondary"; // Grey for passed
    // Red for errors/invalid states
    if (rowData.daysLeftDisplay === "Error" || rowData.daysLeftDisplay === "Invalid Date" || rowData.daysLeftDisplay === "N/A") severity = "danger";

    // Render the PrimeReact Tag component
    return <Tag value={rowData.daysLeftDisplay} severity={severity} />;
   };

  // --- Render Logic ---

  return (
    <Card title={`Upcoming Birthdays - ${currentMonthName}`} className="shadow-md rounded-lg">
      <div className="p-4">

        {/* 1. Loading State */}
        {membersLoading && (
          <div className="text-center p-4">
            <i className="pi pi-spin pi-spinner" style={{'fontSize': '2em'}}></i>
            <p className="mt-2">Loading Members...</p>
          </div>
        )}

        {/* 2. Error State */}
        {/* Show error only if NOT loading, to avoid showing both */}
        {membersError && !membersLoading && (
           <p className="text-red-500 p-4 text-center">
             <i className="pi pi-exclamation-triangle mr-2"></i>
             Error loading members: {membersError.message || 'An unknown error occurred.'}
           </p>
        )}

        {/* 3. Data State (Not Loading, No Error) */}
        {/* Only proceed to render table/message if loading is finished and there's no error */}
        {!membersLoading && !membersError && (
          <>
            {/* Conditionally render DataTable OR the empty message */}
            {birthdaysThisMonth.length > 0 ? (
              // If there are birthdays to show, render the DataTable
              <DataTable
                value={birthdaysThisMonth}
                paginator
                rows={10} // Adjust default rows per page if desired
                rowsPerPageOptions={[5, 10, 20, 50]}
                className="p-datatable-sm" // Use smaller table styling
                sortField="daysLeftNumeric" // Default sort column
                sortOrder={1} // Default sort order (ascending: Today, 1 day, ..., Passed -1, ...)
                responsiveLayout="scroll" // Recommended for responsiveness
                dataKey="id" // Crucial for identifying rows, assumes member objects have a unique 'id'
                emptyMessage="This message should not appear due to outer check" // Fallback message
              >
                <Column header="Pic" body={profilePictureTemplate} style={{ width: '10%', flexGrow: 0, flexShrink: 0 }} />
                <Column header="Name" body={nameTemplate} sortable field="first_name" style={{ width: '25%' }}/>
                <Column field="phone_number" header="Phone" style={{ width: '20%' }} />
                <Column header="Birthday" body={birthDayTemplate} sortable field="date" style={{ width: '20%' }}/>
                <Column
                    header="Status / Days Left"
                    body={daysLeftTemplate}
                    sortable
                    field="daysLeftNumeric" // Sort based on the numeric value
                    style={{ width: '25%' }}/>
              </DataTable>
            ) : (
              // If birthdaysThisMonth array is empty, show this message instead of the table
              <div className="text-center p-4 text-gray-500">
                 <i className="pi pi-calendar-times mr-2" style={{ fontSize: '1.2rem' }}></i>
                 No upcoming birthdays found for {currentMonthName}.
              </div>
            )}
          </>
        )}
      </div>
    </Card>
  );
}