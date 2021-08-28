import enum


class Weekday(enum.Enum):
    MONDAY = 1
    TUESDAY = 2
    WEDNESDAY = 3
    THURSDAY = 4
    FRIDAY = 5
    SATURDAY = 6
    SUNDAY = 7


class RunFrequency(enum.Enum):
    DAILY = 1
    WEEKLY = 2
    MONTHLY = 3
    CUSTOM = 4