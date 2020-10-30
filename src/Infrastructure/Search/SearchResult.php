<?php

namespace App\Infrastructure\Search;

class SearchResult
{
    private array $items;
    private int $total;

    /**
     * @param SearchResultItem[] $results
     */
    public function __construct(array $results, int $total)
    {
        $this->items = $results;
        $this->total = $total;
    }

    /**
     * @return SearchResultItem[]
     */
    public function getItems(): array
    {
        return $this->items;
    }

    public function getTotal(): int
    {
        return $this->total;
    }
}