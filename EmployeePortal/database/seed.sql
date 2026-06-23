INSERT INTO departments(name, description)
VALUES
('Engineering', 'Software Development Team'),
('Human Resources', 'HR Department'),
('Finance', 'Finance Department');

INSERT INTO employees
(
 first_name,
 last_name,
 email,
 phone,
 salary,
 department_id
)
VALUES
(
 'John',
 'Doe',
 'john@example.com',
 '9876543210',
 65000,
 1
),
(
 'Jane',
 'Smith',
 'jane@example.com',
 '9876543211',
 72000,
 2
);

INSERT INTO attendance
(
 employee_id,
 attendance_date,
 status
)
VALUES
(
 1,
 CURRENT_DATE,
 'Present'
);

INSERT INTO leave_requests
(
 employee_id,
 start_date,
 end_date,
 reason
)
VALUES
(
 1,
 CURRENT_DATE,
 CURRENT_DATE + INTERVAL '2 day',
 'Personal Work'
);
