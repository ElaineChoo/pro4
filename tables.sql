CREATE TABLE IF NOT EXISTS users (
          id SERIAL PRIMARY KEY,
          username VARCHAR(255),
          email VARCHAR(255),
          PASSWORD VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS events(
          id SERIAL PRIMARY KEY,
          event_name VARCHAR(255),
          venue VARCHAR(255),
          start_date VARCHAR(255),
          no_of_days VARCHAR(255),
          userid VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS sessions (
          id SERIAL PRIMARY KEY,
          session_name VARCHAR(255),
          session_start_time VARCHAR(255),
          session_end_time VARCHAR(255),
          faculty_id VARCHAR(255),
          event_id VARCHAR(255),
          room_id VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS rooms (
          id SERIAL PRIMARY KEY,
          room_name VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS facultys (
          id SERIAL PRIMARY KEY,
          salutation VARCHAR(255),
          faculty_name VARCHAR(255),
          designation VARCHAR(255),
          institution VARCHAR(255),
          session_id VARCHAR(255),
          topic_id VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS topics (
          id SERIAL PRIMARY KEY,
          title VARCHAR(255),
          topic_start_time VARCHAR(255),
          topic_end_time VARCHAR(255),
          faculty_id VARCHAR(255),
          session_id VARCHAR(255)
);