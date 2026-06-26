<?php
$sqlitePath = __DIR__ . '/database/database.sqlite';
$sqlDumpPath = __DIR__ . '/database_dump.sql';

if (!file_exists($sqlitePath)) {
    die("SQLite database not found.\n");
}

$pdo = new PDO("sqlite:$sqlitePath");
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$tablesQuery = $pdo->query("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'");
$tables = $tablesQuery->fetchAll(PDO::FETCH_COLUMN);

$output = "SET FOREIGN_KEY_CHECKS=0;\n\n";

foreach ($tables as $table) {
    // We don't want to insert migrations table because Laravel migration will create it.
    // Wait, if they just import this file over an empty database, they NEED the schema.
    // We only provide data inserts. They MUST run migrations first.
    if ($table === 'migrations') continue;

    $stmt = $pdo->query("SELECT * FROM `$table`");
    $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if (count($rows) === 0) continue;

    $output .= "-- Dumping data for table `$table`\n";
    foreach ($rows as $row) {
        $columns = array_keys($row);
        $values = array_values($row);
        
        $escapedColumns = array_map(function($col) { return "`$col`"; }, $columns);
        $escapedValues = array_map(function($val) use ($pdo) {
            if ($val === null) return 'NULL';
            // Simple escape for MySQL (this is basic, but usually works for simple CMS data)
            $val = str_replace(["\\", "'", "\n", "\r"], ["\\\\", "''", "\\n", "\\r"], $val);
            return "'$val'";
        }, $values);

        $output .= "INSERT INTO `$table` (" . implode(', ', $escapedColumns) . ") VALUES (" . implode(', ', $escapedValues) . ");\n";
    }
    $output .= "\n";
}

$output .= "SET FOREIGN_KEY_CHECKS=1;\n";

file_put_contents($sqlDumpPath, $output);
echo "Dump created at $sqlDumpPath\n";
