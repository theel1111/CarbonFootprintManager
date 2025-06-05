-- Show create statements for all tables
SHOW TABLES;

SELECT CONCAT('Table: ', table_name, '\n',
       '----------------------------------------\n',
       GROUP_CONCAT(
           CONCAT(column_name, ' ', column_type, 
                 IF(is_nullable = 'NO', ' NOT NULL', ''),
                 IF(column_default IS NOT NULL, CONCAT(' DEFAULT ', column_default), ''),
                 IF(extra != '', CONCAT(' ', extra), '')
           )
           ORDER BY ordinal_position
           SEPARATOR '\n'
       ), '\n\n'
) as table_schema
FROM information_schema.columns 
WHERE table_schema = 'carbon_footprint'
GROUP BY table_name;

-- Show foreign key constraints
SELECT 
    CONCAT('ALTER TABLE ', table_name, ' ADD FOREIGN KEY (', column_name, ') REFERENCES ', referenced_table_name, '(', referenced_column_name, ');') as foreign_keys
FROM
    information_schema.key_column_usage
WHERE
    referenced_table_schema = 'carbon_footprint'
    AND referenced_table_name IS NOT NULL;

-- Show indexes
SELECT 
    CONCAT('Table: ', table_name, '\nIndexes:\n', 
           GROUP_CONCAT(
               CONCAT('  - ', index_name, ' (', column_name, ')')
               SEPARATOR '\n'
           )
    ) as table_indexes
FROM information_schema.statistics
WHERE table_schema = 'carbon_footprint'
GROUP BY table_name; 