select
 to_char(timezone('Europe/London', fetched), 'DD/MM/YYYY') as "day"
, to_char(timezone('Europe/London', fetched), 'HH24:MI:SS') as "time"
,count
from public.occupancy_checks
where fetched > '2020-08-02 01:14:44.302000+00:00'
LIMIT 1000